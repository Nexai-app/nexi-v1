use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
};
use ic_cdk_macros::{self, query, update};
use openai::chat_completion::{self, ChatCompletionRequest};
use openai::common::GPT3_5_TURBO;

mod openai;

#[update]
async fn hello_openai() -> Result<String, String> {
    //2. SETUP ARGUMENTS FOR HTTP GET request

    // 2.1 Setup the URL

    let url = "https://api.openai.com/v1/chat/completions";
    let api_key = "sk-";

    let request_headers = vec![
        HttpHeader {
            name: "Authorization".to_string(),
            value: format!("Bearer {}", api_key).to_string(),
        },
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        },
    ];

    let req = ChatCompletionRequest::new(
        GPT3_5_TURBO.to_string(),
        vec![chat_completion::ChatCompletionMessage {
            role: chat_completion::MessageRole::user,
            content: chat_completion::Content::Text(String::from("Hello OpenAI!")),
            name: None,
        }],
    );
    let json_string = serde_json::to_string(&req).unwrap();

    let json_utf8: Vec<u8> = json_string.into_bytes();
    let request_body: Option<Vec<u8>> = Some(json_utf8);

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        max_response_bytes: None, //optional for request
        method: HttpMethod::POST,
        headers: request_headers,
        body: request_body,
        transform: None,
        // transform: None, //optional for request
    };

    let result: Result<String, String> = match http_request(request, 1_603_148_400).await {
        Ok((response,)) => {
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");
            ic_cdk::api::print(format!("{:?}", str_body));
            if (200u32..=299u32).contains(&response.status) {
                let result: String = format!(
                    "{}. See more info of the request sent at: {}/inspect",
                    str_body, url
                );

                Ok(result)
            } else {
                Err(format!("{}: {}", response.status, str_body))
            }
        }
        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");

            Err(message)
        }
    };

    result
}

// Strips all data that is not needed from the original response.
#[query]
fn transform(raw: TransformArgs) -> HttpResponse {
    let headers = vec![
        HttpHeader {
            name: "Content-Security-Policy".to_string(),
            value: "default-src 'self'".to_string(),
        },
        HttpHeader {
            name: "Referrer-Policy".to_string(),
            value: "strict-origin".to_string(),
        },
        HttpHeader {
            name: "Permissions-Policy".to_string(),
            value: "geolocation=(self)".to_string(),
        },
        HttpHeader {
            name: "Strict-Transport-Security".to_string(),
            value: "max-age=63072000".to_string(),
        },
        HttpHeader {
            name: "X-Frame-Options".to_string(),
            value: "DENY".to_string(),
        },
        HttpHeader {
            name: "X-Content-Type-Options".to_string(),
            value: "nosniff".to_string(),
        },
    ];

    let mut res = HttpResponse {
        status: raw.response.status.clone(),
        body: raw.response.body.clone(),
        headers,
        ..Default::default()
    };

    if res.status == 200_u8 {
        res.body = raw.response.body;
    } else {
        ic_cdk::api::print(format!("Received an error from coinbase: err = {:?}", raw));
    }
    res
}

ic_cdk::export_candid!();
