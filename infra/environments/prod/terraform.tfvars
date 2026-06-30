# subscription_id 는 환경변수 ARM_SUBSCRIPTION_ID 로 설정하거나 여기에 입력
# subscription_id = "e0c3cad0-ed2e-49bc-9a7a-0f4977e3ff8c"

resource_group_name = "clode-llmops-rg"
location            = "eastasia"

cosmos_account_name = "clode-cosmos"
cosmos_serverless   = true

swa_name = "clode"
swa_sku  = "Free"

# ── DR / 이중화 토글 (기본 off) ───────────────────────────────────────────────
enable_multi_region    = false
enable_zone_redundancy = false
secondary_location     = "southeastasia"
