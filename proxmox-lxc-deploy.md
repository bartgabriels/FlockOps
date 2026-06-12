# Proxmox LXC Deployment for Schapentracker

This guide describes how to deploy the Schapentracker backend using an LXC container on Proxmox.

## 1. Create the LXC container

Recommended template: Debian 12 or Ubuntu 24.04.

### Proxmox GUI settings
- Create a new LXC container.
- Hostname: `schapentracker`
- Storage: >= 20GB
- CPU: 2 cores
- Memory: 2GB RAM
- Network: default bridge with a static or DHCP IP
- Features: enable `nesting=1`

> If the GUI does not expose `nesting`, set it with:
>
```bash
pct set <vmid> -features nesting=1,keyctl=1
```

## 2. Install Docker inside the LXC container

Login to the container from the Proxmox host:

```bash
pct enter <vmid>
```

Then run:

```bash
apt update && apt install -y ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable docker
systemctl start docker
```

If `systemctl` is not available, use:

```bash
service docker start
```

Verify Docker:

```bash
docker version
```

## 3. Copy the project into the container

From your workstation or Proxmox host, copy the repository into the container.

Example using `scp`:

```bash
scp -r /path/to/Schapentracker root@<lxc-ip>:/root/Schapentracker
```

Or use the Proxmox host and `pct push`:

```bash
pct push <vmid> /local/path/Schapentracker /root/Schapentracker --recursive
```

## 4. Start the Docker Compose stack

Enter the container if not already in it:

```bash
pct enter <vmid>
cd /root/Schapentracker
docker compose up -d --build
```

This will launch the API and PostgreSQL services.

## 5. Check the deployment

Confirm the API is reachable:

```bash
curl http://127.0.0.1:4000/health
```

From a browser or other machine:

```text
http://<lxc-ip>:4000/health
```

If the container exposes `4000`, the service should respond with `{"status":"ok"}`.

## 6. Make the service reachable externally

### Option A: open port on the LXC container
If the container network is already accessible, simply use the container IP.

### Option B: publish through the Proxmox host
Use NAT or port forwarding on the host firewall so `http://<host-ip>:4000` forwards to the container.

### Option C: use a reverse proxy
For production, place an Nginx or Traefik reverse proxy in front of the app and secure it with TLS.

## 7. Secure production deployment

- Change the database password in `docker-compose.yml`
- Use a real reverse proxy with HTTPS
- Protect the API with authentication before exposing it publicly
- Enable firewall rules for port 4000 only if needed

## Optional: PostgreSQL data persistence
The compose file already creates a named volume `db_data` for the database.

To backup the database:

```bash
docker compose exec db pg_dumpall -U schapentracker > /root/db-backup.sql
```

## Troubleshooting

- If Docker install fails, verify `nesting=1` and `keyctl=1` are enabled on the container.
- If `docker compose` is missing, install `docker-compose-plugin` and restart Docker.
- If port `4000` is blocked, check the container network settings and Proxmox host firewall.
