variable "subscription_id" {
  description = "Azure subscription ID. 환경변수 ARM_SUBSCRIPTION_ID 로도 설정 가능."
  type        = string
  default     = ""
}

variable "resource_group_name" {
  type    = string
  default = "clode-llmops-rg"
}

variable "location" {
  type    = string
  default = "eastasia"
}

variable "cosmos_account_name" {
  type    = string
  default = "clode-cosmos"
}

variable "swa_name" {
  type    = string
  default = "clode"
}

variable "swa_sku" {
  type        = string
  default     = "Free"
  description = "Free | Standard (Standard = 월 고정요금 발생, 전체 기능 활성화)"
}

# ── Cosmos 토글 ───────────────────────────────────────────────────────────────

variable "cosmos_serverless" {
  type        = bool
  default     = true
  description = "Serverless 모드. true이더라도 멀티리전·AZ 중복 활성화 시 자동 off."
}

variable "enable_multi_region" {
  type        = bool
  default     = false
  description = "보조 리전 복제 켜기 (Serverless와 병용 불가 — 자동 provisioned 전환)"
}

variable "enable_zone_redundancy" {
  type        = bool
  default     = false
  description = "가용성 영역(AZ) 중복 켜기 (Serverless와 병용 불가)"
}

variable "secondary_location" {
  type        = string
  default     = "southeastasia"
  description = "enable_multi_region=true 일 때의 보조 리전"
}
