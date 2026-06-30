variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "account_name" {
  type = string
}

variable "cosmos_serverless" {
  type        = bool
  default     = true
  description = "true = Serverless(종량제). enable_multi_region=true 또는 enable_zone_redundancy=true 시 자동으로 false로 전환."
}

variable "enable_multi_region" {
  type        = bool
  default     = false
  description = "true = 보조 리전 복제 활성화. Serverless와 함께 사용 불가 → cosmos_serverless를 자동 off."
}

variable "enable_zone_redundancy" {
  type        = bool
  default     = false
  description = "true = 가용성 영역(AZ) 중복 활성화. Serverless와 함께 사용 불가."
}

variable "secondary_location" {
  type        = string
  default     = "southeastasia"
  description = "enable_multi_region=true 일 때 사용할 보조 리전"
}

variable "database_name" {
  type    = string
  default = "resume-db"
}

variable "container_name" {
  type    = string
  default = "resumes"
}
