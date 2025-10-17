O Windows PowerShell
Copyright (C) Microsoft Corporation. Todos os direitos reservados.

Instale o PowerShell mais recente para obter novos recursos e aprimoramentos! https://aka.ms/PSWindows

PS C:\Users\ANDREE> ssh root@31.97.166.28
Enter passphrase for key 'C:\Users\ANDREE/.ssh/id_ed25519':
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-84-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Fri Oct 17 00:01:54 UTC 2025

  System load:  0.19               Processes:             184
  Usage of /:   33.3% of 47.39GB   Users logged in:       1
  Memory usage: 42%                IPv4 address for eth0: 31.97.166.28
  Swap usage:   0%                 IPv6 address for eth0: 2a02:4780:14:b253::1


Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


1 updates could not be installed automatically. For more details,
see /var/log/unattended-upgrades/unattended-upgrades.log

*** System restart required ***
Last login: Thu Oct 16 23:51:43 2025 from 179.125.135.240
root@srv866884:~# # Execute este comando no seu VPS:
echo "=== CONTAINERS ===" && docker ps && echo "=== LOGS FRONTEND ===" && docker logs sistema-futebol-frontend-1 --tail 10 && echo "=== PORTA 8080 ===" && sudo netstat -tlnp | grep 8080
=== CONTAINERS ===
CONTAINER ID   IMAGE                                                   COMMAND                  CREATED          STATUS                          PORTS                                                                                                                       NAMES
990b942bd842   ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest   "docker-entrypoint.s…"   19 minutes ago   Restarting (1) 25 seconds ago                                                                                                                               sistema_futebol-frontend-1
d6f1a27eef4c   ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "gunicorn -w 4 -b 0.…"   19 minutes ago   Up 19 minutes                   0.0.0.0:5001->5000/tcp, [::]:5001->5000/tcp                                                                                 sistema_futebol-backend-1
360a52bf68c5   lscr.io/linuxserver/filezilla:3.68.1                    "/init"                  22 hours ago     Up 22 hours                     3000-3001/tcp                                                                                                               andre_fin_filezilla.1.6m62qhru9fxhxbhu50rllhq9w
af6833705415   easypanel/easypanel:latest                              "node backend.js sta…"   22 hours ago     Up 22 hours                     0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp                                                                                 easypanel.1.8qzpvgibvne682nsuqei454fj
1c1882ede4cb   fin_flask_react-frontend                                "/docker-entrypoint.…"   3 months ago     Up 22 hours                     80/tcp                                                                                                                      fin_flask_react-frontend-1
d5cd25cf9134   traefik:latest                                          "/entrypoint.sh --ap…"   3 months ago     Up 22 hours                     0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:443->443/tcp, [::]:443->443/tcp, 0.0.0.0:8081->8080/tcp, [::]:8081->8080/tcp   fin_flask_react-traefik-1
1634d25afb49   fin_flask_react-backend:latest                          "gunicorn -w 4 -b 0.…"   3 months ago     Up 22 hours                     5000/tcp                                                                                                                    fin_flask_react-backend-1
=== LOGS FRONTEND ===
Error response from daemon: No such container: sistema-futebol-frontend-1
root@srv866884:~#


root@srv866884:~# docker ps
CONTAINER ID   IMAGE                                                   COMMAND                  CREATED          STATUS                          PORTS                                                                                                                       NAMES
990b942bd842   ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest   "docker-entrypoint.s…"   19 minutes ago   Restarting (1) 40 seconds ago                                                                                                                               sistema_futebol-frontend-1
d6f1a27eef4c   ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "gunicorn -w 4 -b 0.…"   19 minutes ago   Up 19 minutes                   0.0.0.0:5001->5000/tcp, [::]:5001->5000/tcp                                                                                 sistema_futebol-backend-1
360a52bf68c5   lscr.io/linuxserver/filezilla:3.68.1                    "/init"                  22 hours ago     Up 22 hours                     3000-3001/tcp                                                                                                               andre_fin_filezilla.1.6m62qhru9fxhxbhu50rllhq9w
af6833705415   easypanel/easypanel:latest                              "node backend.js sta…"   22 hours ago     Up 22 hours                     0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp                                                                                 easypanel.1.8qzpvgibvne682nsuqei454fj
1c1882ede4cb   fin_flask_react-frontend                                "/docker-entrypoint.…"   3 months ago     Up 22 hours                     80/tcp                                                                                                                      fin_flask_react-frontend-1
d5cd25cf9134   traefik:latest                                          "/entrypoint.sh --ap…"   3 months ago     Up 22 hours                     0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:443->443/tcp, [::]:443->443/tcp, 0.0.0.0:8081->8080/tcp, [::]:8081->8080/tcp   fin_flask_react-traefik-1
1634d25afb49   fin_flask_react-backend:latest                          "gunicorn -w 4 -b 0.…"   3 months ago     Up 22 hours                     5000/tcp                                                                                                                    fin_flask_react-backend-1
root@srv866884:~#


root@srv866884:~# docker logs sistema-futebol-frontend-1 --tail 20
Error response from daemon: No such container: sistema-futebol-frontend-1
root@srv866884:~#


root@srv866884:~# sudo netstat -tlnp | grep 8080
sudo lsof -i :8080
root@srv866884:~# sudo lsof -i :8080
root@srv866884:~# sudo netstat -tlnp | grep 8080
root@srv866884:~#


root@srv866884:~# sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
5432/tcp                   ALLOW       Anywhere
3000/tcp                   ALLOW       Anywhere
5000/tcp                   ALLOW       Anywhere
7000/tcp                   ALLOW       Anywhere
21/tcp                     ALLOW       Anywhere
30000:30100/tcp            ALLOW       Anywhere
20/tcp                     ALLOW       Anywhere
22/tcp                     ALLOW       Anywhere
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)
5432/tcp (v6)              ALLOW       Anywhere (v6)
3000/tcp (v6)              ALLOW       Anywhere (v6)
5000/tcp (v6)              ALLOW       Anywhere (v6)
7000/tcp (v6)              ALLOW       Anywhere (v6)
21/tcp (v6)                ALLOW       Anywhere (v6)
30000:30100/tcp (v6)       ALLOW       Anywhere (v6)
20/tcp (v6)                ALLOW       Anywhere (v6)
22/tcp (v6)                ALLOW       Anywhere (v6)

root@srv866884:~#


root@srv866884:~# # Ver se Easypanel está usando porta 8080
sudo systemctl status easypanel
sudo netstat -tlnp | grep easypanel
Unit easypanel.service could not be found.
root@srv866884:~#



