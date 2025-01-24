provider "aws" {
  region = "us-east-1"
  profile = "default"
}

resource "aws_instance" "example" {
  ami           = "ami-0df8c184d5f6ae949"
  instance_type = "t2.micro"

  tags = {
    Name = "PaymentSimulator"
  }
}
