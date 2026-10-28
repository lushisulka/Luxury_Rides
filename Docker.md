- docker compose up -d
- docker compose stop


# Docker — Komandat kryesore

## 1. Kontrollo Docker-in

```powershell
docker --version
docker compose version
```

## 2. Nis projektin

```powershell
docker compose up -d
```

Për ta ndërtuar dhe nisur projektin:

```powershell
docker compose up -d --build
```

- `up` — nis shërbimet.
- `-d` — i lë të punojnë në sfond.
- `--build` — ndërton imazhet para nisjes.

## 3. Kontrollo statusin

```powershell
docker compose ps
```

## 4. Shiko gabimet (log-et)

```powershell
docker compose logs --tail=50
```

Vetëm frontend:

```powershell
docker compose logs --tail=50 frontend
```

Vetëm backend:

```powershell
docker compose logs --tail=50 backend
```

## 5. Rindërto pas ndryshimeve

```powershell
docker compose up -d --build frontend
```

Për backend:

```powershell
docker compose up -d --build backend
```

## 6. Ndal projektin

Për t’i ndalur container-at:

```powershell
docker compose stop
```

Për t’i ndalur dhe hequr container-at:

```powershell
docker compose down
```

**Kujdes:** Mos përdor `docker compose down -v` nëse dëshiron të ruash databazën.

## 7. Adresat e Luxury Rides

- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- MySQL Workbench: `127.0.0.1`, porta `3308`

## Komandat që duhet të mbash mend

| Qëllimi | Komanda |
|---|---|
| Nis projektin | `docker compose up -d` |
| Ndërto dhe nis | `docker compose up -d --build` |
| Kontrollo statusin | `docker compose ps` |
| Shiko log-et | `docker compose logs --tail=50` |
| Ndal projektin | `docker compose down` |