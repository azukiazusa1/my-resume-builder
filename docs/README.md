# Docs

This is the directory for writing PlantUML.

## Setup

1. Build the PlantUML server.

```bash
docker compose up -d
```

2. Install PlantUML Extention for Visual Studio Code.

https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml

3. Edit Extention Settings.

- Plantuml:Render -> PlantUMLServer
- Plantuml:Server -> http://localhost:1234/
