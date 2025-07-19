# Cloud-based File Upload, Processing, and Distribution Platform


## Project name: SaaS-type log collection, analysis, and monitoring platform (Mini Datadog/ELK)

### Project overview
A platform that collects, stores, searches, and visualizes logs generated from multiple applications (including sample apps for testing)
Provides real-time notifications (errors, specific patterns, etc.) and dashboards
You can experience all the core technologies of DevOps and backend (log pipelines, distributed systems, monitoring, cloud infrastructure, container orchestration, etc.)


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

## Roles by component
- **Backend (C# .NET Web API)**:
API for log collection (REST, gRPC, etc.), user authentication, log search/filtering, notification trigger, DB connection

- **Data processing (Python**):
Log parsing, pattern analysis, notification condition detection (e.g. errors, traffic surges, etc.), simple machine learning-based anomaly detection

- **Frontend (React)**:
Log search/filter UI, dashboard (charts, notification history, etc.)

- **DB (Amazon RDS PostgreSQL)**:
Storing logs, users, and notification history

- **Containerization (Docker**):
Dockerfile, docker-compose, and ECS deployment for each service

- **Cloud (AWS ECS, Lambda, CloudWatch)**:
Deploying services with ECS, periodic aggregation/notification with Lambda, monitoring and collecting logs for own services with CloudWatch

## Expansion ideas
Support for various log sources (web, mobile, IoT, etc.)
Integrating external notifications such as Slack/email/text messages
Automatically generating log aggregation/analysis reports



## MVP
### 1st priority
1. Authentication
User Login/Logout (Membership registration will be postponed until after MVP)
Auth token management (JWT, etc.)

2. File Upload
File selection and upload (Drag & Drop, file explorer)
Upload progress display
Upload status display (success/failure)

3. File List & Management
View uploaded file list
Display status of each file (before/after conversion, error, etc.)
Delete file

### 2nd priority
4. File Preview & Download
Preview images/documents/videos (only available formats)
Download converted files

5. Notifications & Status
Major event notifications (Toast, etc.) for upload/conversion/deletion
Real-time display of conversion status (polling)

### 3rd priority
6. User Profile (optional)
My information/Change password
Manage my file/upload history

7. Responsive UI & UX
Mobile/desktop responsive
Accessibility

8. Error Handling
Handling exceptions such as network/server errors, authentication expiration, etc.
