# Cloud-based File Upload, Processing, and Distribution Platform

## Project Structure

```
SP-01/
│
├── backend/           # C# .NET Web API (File upload/download, authentication, metadata management)
├── processor/         # Python (File processing, asynchronous tasks)
├── frontend/          # React (File upload/management UI)
├── infra/             # IaC, Docker, deployment scripts, AWS configuration
├── docs/              # Architecture, ERD, API documentation
├── .env.example       # Example environment variables
├── docker-compose.yml # Orchestration for local development
└── README.md
```

## Directory Descriptions
- **backend/**: C# .NET Web API server source and tests
- **processor/**: Python-based file processing service
- **frontend/**: React frontend source
- **infra/**: AWS ECS, Lambda, CloudWatch, and other infrastructure/deployment scripts and configuration
- **docs/**: Project documentation such as architecture, ERD, and API specs
- **.env.example**: Example environment variable file
- **docker-compose.yml**: Orchestration file for local development
