# IS215G6T5

DBTT Wireframe with AI and Analytics Tool.
Analytics and AI algorithm code can be found at `real-estate-tool-backend/price-predictor/app/main.py` and `real-estate-tool-backend/matching-service/app/matching.py` respectively.

## Run Locally

Before starting, ensure you have docker and npm installed on your system

Clone the project

```bash
  git clone https://github.com/jitthing/IS215G6T5.git
```

Go to the project backend directory

```bash
  cd IS215G6T5/real-estate-tool-backend
```

Download the [dataset](https://drive.google.com/file/d/1z9I760M_adgkgqqzQLNpbqx34vZk8oj1/view?usp=drive_link) into the `real-estate-tool-backend/price-predictor` directory.

Start the backend containers with docker.

```bash
  docker compose up -d --build
```

Install dependencies in the frontend build

```bash
  cd real-estate-tool
  npm install --force
```

Copy the .env.example into a .env

```bash
  cp .env.example .env.local
```

Start the server

```bash
  npm run dev
```

Access the site at http://localhost:3000
