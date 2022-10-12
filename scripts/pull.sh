cd real-home-data
git pull
docker compose down
docker system prune -af
docker compose up -d
