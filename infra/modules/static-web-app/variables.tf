variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "name" {
  type = string
}

variable "sku_tier" {
  type        = string
  default     = "Free"
  description = <<-EOT
    "Free"  : 빌트인 인증·SWA managed Functions 사용 가능. 커스텀 도메인 제한.
    "Standard" : 전체 기능 + API Management 통합. 월 ~$9 고정요금.
  EOT
  validation {
    condition     = contains(["Free", "Standard"], var.sku_tier)
    error_message = "sku_tier 는 'Free' 또는 'Standard' 이어야 합니다."
  }
}

variable "cosmos_connection_string" {
  type        = string
  sensitive   = true
  description = "Cosmos DB 연결 문자열 — SWA app_settings로 주입"
}
