---
name: dev
description: Start the development server
user_invocable: true
---

Start the local development server:

1. Check if port 8080 is already in use with `lsof -i :8080`
2. If occupied, kill the existing process
3. Run `npm run dev` in the background
4. Wait 3 seconds, then verify the server is responding with `curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/`
5. Report the URL: **http://localhost:8080/**
