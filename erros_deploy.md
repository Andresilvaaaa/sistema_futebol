Run appleboy/ssh-action@master
Run echo "$GITHUB_ACTION_PATH" >> $GITHUB_PATH
Run entrypoint.sh
Downloading drone-ssh-1.8.1-linux-amd64 from https://github.com/appleboy/drone-ssh/releases/download/v1.8.1
======= CLI Version Information =======
Drone SSH version 1.8.1
=======================================
main.Plugin {
   Config: main.Config {
      Key: "***
***
***
***
***
***
***",
      Passphrase: "",
      KeyPath: "",
      Username: "***",
      Password: "",
      Host: []string:1:1 {
         "***",
      },
      Port: ***,
      Protocol: "tcp",
      Fingerprint: "",
      Timeout: 30s,
      CommandTimeout: 30m0s,
      Script: []string:1:1 {
         "set -e
echo "✅ Deploy iniciado!"
echo "📍 Servidor: $(hostname)"
echo "👤 Usuário: $(whoami)"

# Verificar Docker
docker --version
docker compose version

# Criar diretório do projeto (usa nome do repo)
mkdir -p ~/sistema_futebol
cd ~/sistema_futebol

# Clone ou atualize repositório
if [ -d ".git" ]; then
  echo "📂 Atualizando repositório..."
  git fetch --all
  git reset --hard origin/main
else
  echo "📥 Clonando repositório..."
  git clone https://github.com/${GITHUB_REPOSITORY}.git .
fi

# Criar/atualizar .env para docker compose (variáveis de produção)
echo "🔐 Atualizando .env..."
cat > .env <<EOF
DATABASE_URL=${PROD_DATABASE_URL}
SECRET_KEY=${PROD_SECRET_KEY}
JWT_SECRET_KEY=${PROD_JWT_SECRET_KEY}
CORS_ORIGINS=${PROD_CORS_ORIGINS}
EOF

# Verificar se os Dockerfiles existem e subir com build
if [ -f "docker-compose.yml" ]; then
  echo "🐳 Docker Compose encontrado!"
  # Parar containers antigos
  docker compose down || true
  # Construir e iniciar containers
  docker compose up -d --build
  # Verificar status
  docker compose ps
else
  echo "⚠️ docker-compose.yml não encontrado"
  echo "📁 Estrutura do projeto:"
  ls -la
fi

echo "🎉 Deploy concluído!"
echo "📅 $(date)"",
      },
      ScriptStop: false,
      Envs: []string:5:8 {
         "PROD_DATABASE_URL",
         "PROD_SECRET_KEY",
         "PROD_JWT_SECRET_KEY",
         "PROD_CORS_ORIGINS",
         "GITHUB_REPOSITORY",
      },
      Proxy: easyssh.DefaultConfig {
         User: "",
         Server: "",
         Key: "",
         KeyPath: "",
         Port: "***",
         Protocol: "tcp",
         Passphrase: "",
         Password: "",
         Timeout: 30s,
         Ciphers: []string(nil),
         KeyExchanges: []string(nil),
         Fingerprint: "",
         UseInsecureCipher: false,
      },
      Debug: true,
      Sync: false,
      Ciphers: []string(nil),
      UseInsecureCipher: false,
      EnvsFormat: "",
      AllEnvs: false,
      RequireTty: false,
   },
   Writer: &os.File {#1
      file: &os.file {#2
         pfd: poll.FD {
            fdmu: poll.fdMutex {
               state: 0,
               rsema: 0,
               wsema: 0,
            },
            Sysfd: 1,
            SysFile: poll.SysFile {
               iovecs: *[]syscall.Iovec(nil),
            },
            pd: poll.pollDesc {
               runtimeCtx: 0x0,
            },
            csema: 0,
            isBlocking: 1,
            IsStream: true,
            ZeroReadIsEOF: true,
            isFile: true,
         },
         name: "/dev/stdout",
         dirinfo: atomic.Pointer[os.dirInfo] {
            _: [0]*os.dirInfo {},
            _: atomic.noCopy {},
            v: unsafe.Pointer(0x0),
         },
         nonblock: false,
         stdoutOrErr: true,
         appendMode: false,
      },
   },
}
======CMD======
set -e
echo "✅ Deploy iniciado!"
echo "📍 Servidor: $(hostname)"
echo "👤 Usuário: $(whoami)"

# Verificar Docker
docker --version
docker compose version

# Criar diretório do projeto (usa nome do repo)
mkdir -p ~/sistema_futebol
cd ~/sistema_futebol

# Clone ou atualize repositório
if [ -d ".git" ]; then
  echo "📂 Atualizando repositório..."
  git fetch --all
  git reset --hard origin/main
else
  echo "📥 Clonando repositório..."
  git clone https://github.com/${GITHUB_REPOSITORY}.git .
fi

# Criar/atualizar .env para docker compose (variáveis de produção)
echo "🔐 Atualizando .env..."
cat > .env <<EOF
DATABASE_URL=${PROD_DATABASE_URL}
SECRET_KEY=${PROD_SECRET_KEY}
JWT_SECRET_KEY=${PROD_JWT_SECRET_KEY}
CORS_ORIGINS=${PROD_CORS_ORIGINS}
EOF

# Verificar se os Dockerfiles existem e subir com build
if [ -f "docker-compose.yml" ]; then
  echo "🐳 Docker Compose encontrado!"
  # Parar containers antigos
  docker compose down || true
  # Construir e iniciar containers
  docker compose up -d --build
  # Verificar status
  docker compose ps
else
  echo "⚠️ docker-compose.yml não encontrado"
  echo "📁 Estrutura do projeto:"
  ls -la
fi

echo "🎉 Deploy concluído!"
echo "📅 $(date)"
======END======
======ENV======
export PROD_DATABASE_URL='***
'
export PROD_SECRET_KEY='***'
export PROD_JWT_SECRET_KEY='***'
export PROD_CORS_ORIGINS='***
'
export GITHUB_REPOSITORY='Andresilvaaaa/sistema_futebol'
======END======
✅ Deploy iniciado!
📍 Servidor: srv866884
👤 Usuário: ***
Docker version 28.5.1, build e180ab8
Docker Compose version v2.40.0
📥 Clonando repositório...
Cloning into '.'...
🔐 Atualizando .env...
🐳 Docker Compose encontrado!
time="2025-10-16T23:15:08Z" level=warning msg="/***/sistema_futebol/docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
time="2025-10-16T23:15:08Z" level=warning msg="/***/sistema_futebol/docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
#1 [internal] load local bake definitions
#1 reading from stdin 1.05kB done
#1 DONE 0.0s
#2 [backend internal] load build definition from Dockerfile
#2 transferring dockerfile:
#2 transferring dockerfile: 948B 0.0s done
#2 DONE 0.0s
#3 [frontend internal] load build definition from Dockerfile
#3 transferring dockerfile: 981B 0.0s done
#3 DONE 0.1s
#4 [frontend internal] load metadata for docker.io/library/node:20-alpine
#4 ...
#5 [backend internal] load metadata for docker.io/library/python:3.11-slim
#5 DONE 1.7s
#4 [frontend internal] load metadata for docker.io/library/node:20-alpine
#4 DONE 1.7s
#6 [backend internal] load .dockerignore
#6 transferring context: 2B done
#6 DONE 0.0s
#7 [frontend builder 1/7] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
#7 resolve docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48 done
#7 sha256:30c8b6e55a5d5ecb074e7f05c212f3f604e0890aafb7799***dff8485054c1e26 6.42kB / 6.42kB done
#7 sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b 0B / 3.80MB 0.1s
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 0B / 42.75MB 0.1s
#7 sha256:f2fbe8556258562779088bb23277d1d0b7e43fc6ddd52623166a2ac6d92bc73a 0B / 1.26MB 0.1s
#7 sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48 7.67kB / 7.67kB done
#7 sha256:cfdec67901844c550fbb1164a239e3d8a902853ebdc273f2f7f93ce5eaeda97f 1.72kB / 1.72kB done
#7 ...
#8 [backend internal] load build context
#8 transferring context: 414.09kB 0.1s done
#8 DONE 0.2s
#9 [frontend internal] load build context
#9 transferring context: 815.29kB 0.2s done
#9 DONE 0.2s
#7 [frontend builder 1/7] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
#7 sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b 2.99MB / 3.80MB 0.3s
#7 sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b 3.80MB / 3.80MB 0.3s done
#7 extracting sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b
#7 sha256:c74c90aa7c8726728fa9d2e330254ef29381efbd566aaee9933c3113c26f20ce 0B / 445B 0.4s
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 3.15MB / 42.75MB 0.5s
#7 sha256:f2fbe8556258562779088bb23277d1d0b7e43fc6ddd52623166a2ac6d92bc73a 1.05MB / 1.26MB 0.6s
#7 extracting sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b 0.2s done
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 16.13MB / 42.75MB 0.8s
#7 sha256:f2fbe8556258562779088bb23277d1d0b7e43fc6ddd52623166a2ac6d92bc73a 1.26MB / 1.26MB 0.6s done
#7 sha256:c74c90aa7c8726728fa9d2e330254ef29381efbd566aaee9933c3113c26f20ce 445B / 445B 0.7s done
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 21.83MB / 42.75MB 0.9s
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 28.31MB / 42.75MB 1.0s
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 36.86MB / 42.75MB 1.2s
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 39.71MB / 42.75MB 1.3s
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 42.75MB / 42.75MB 1.4s
#7 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 42.75MB / 42.75MB 1.4s done
#7 extracting sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c
#7 extracting sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 5.2s
#7 extracting sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 6.7s done
#7 extracting sha256:f2fbe8556258562779088bb23277d1d0b7e43fc6ddd52623166a2ac6d92bc73a
#7 extracting sha256:f2fbe8556258562779088bb23277d1d0b7e43fc6ddd52623166a2ac6d92bc73a 0.6s done
#7 extracting sha256:c74c90aa7c8726728fa9d2e330254ef29381efbd566aaee9933c3113c26f20ce
#7 extracting sha256:c74c90aa7c8726728fa9d2e330254ef29381efbd566aaee9933c3113c26f20ce done
#7 DONE 9.2s
#10 [backend 1/8] FROM docker.io/library/python:3.11-slim@sha256:ff8533f48e12b705fc20d339fde2ec61d0b234dd9366bab3bc84d7b70a45c8c0
#10 resolve docker.io/library/python:3.11-slim@sha256:ff8533f48e12b705fc20d339fde2ec61d0b234dd9366bab3bc84d7b70a45c8c0 0.0s done
#10 sha256:ff8533f48e12b705fc20d339fde2ec61d0b234dd9366bab3bc84d7b70a45c8c0 10.37kB / 10.37kB done
#10 sha256:6818dcc897e2708bf24af119860e4d678d9d40a725264beb20d4988deef1ccfe 1.75kB / 1.75kB done
#10 sha256:7bbe597de5c76e70498898003b3e0402a6f4ef23b0ba30d33acd8d1af863f128 5.38kB / 5.38kB done
#10 sha256:8c7716127147648c1751940b9709b6325f***56290d3201662eca2701cadb2cdf 29.78MB / 29.78MB 1.6s done
#10 sha256:c72c567266265eaf3c81cecf291e32dc35cb03f44a34cc37c4bb2c3f1ca6741c 4.25MB / 4.25MB 1.3s done
#10 sha256:76d93c681ade9d7ff7e4e590094f416d05d02ce51cb023dbb97acd48c3073470 14.36MB / 14.36MB 2.4s done
#10 sha256:80061c640d6316e0810fd1007261f33680529077a173449bba4b55579c66db45 250B / 250B 1.8s done
#10 extracting sha256:8c7716127147648c1751940b9709b6325f***56290d3201662eca2701cadb2cdf 3.9s done
#10 extracting sha256:c72c567266265eaf3c81cecf291e32dc35cb03f44a34cc37c4bb2c3f1ca6741c 0.5s done
#10 extracting sha256:76d93c681ade9d7ff7e4e590094f416d05d02ce51cb023dbb97acd48c3073470 2.7s
#10 ...
#11 [frontend builder 2/7] WORKDIR /app/frontend
#11 DONE 0.4s
#12 [frontend runner 2/5] WORKDIR /app
#12 DONE 0.4s
#10 [backend 1/8] FROM docker.io/library/python:3.11-slim@sha256:ff8533f48e12b705fc20d339fde2ec61d0b234dd9366bab3bc84d7b70a45c8c0
#10 extracting sha256:76d93c681ade9d7ff7e4e590094f416d05d02ce51cb023dbb97acd48c3073470 4.3s done
#10 extracting sha256:80061c640d6316e0810fd1007261f33680529077a173449bba4b55579c66db45 done
#10 DONE 10.8s
#13 [backend 2/8] WORKDIR /app
#13 DONE 0.1s
#14 [frontend builder 3/7] RUN corepack enable
#14 DONE 2.6s
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 1.061 Hit:1 http://deb.debian.org/debian trixie InRelease
#15 1.065 Get:2 http://deb.debian.org/debian trixie-updates InRelease [47.3 kB]
#15 1.071 Get:3 http://deb.debian.org/debian-security trixie-security InRelease [43.4 kB]
#15 1.147 Get:4 http://deb.debian.org/debian trixie/main amd64 Packages [9669 kB]
#15 ...
#16 [frontend builder 4/7] COPY frontend/package.json frontend/pnpm-lock.yaml ./
#16 DONE 0.2s
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 1.533 Get:5 http://deb.debian.org/debian trixie-updates/main amd64 Packages [5412 B]
#15 1.540 Get:6 http://deb.debian.org/debian-security trixie-security/main amd64 Packages [53.8 kB]
#15 3.785 Fetched 9819 kB in 3s (3206 kB/s)
#15 3.785 Reading package lists...
#15 6.942 Reading package lists...
#15 9.111 Building dependency tree...
#15 9.653 Reading state information...
#15 10.49 The following additional packages will be installed:
#15 10.49   binutils binutils-common binutils-x86-64-linux-gnu bzip2 cpp cpp-14
#15 10.50   cpp-14-x86-64-linux-gnu cpp-x86-64-linux-gnu dirmngr dpkg-dev
#15 10.50   fontconfig-config fonts-dejavu-core fonts-dejavu-mono g++ g++-14
#15 10.50   g++-14-x86-64-linux-gnu g++-x86-64-linux-gnu gcc gcc-14
#15 10.50   gcc-14-x86-64-linux-gnu gcc-x86-64-linux-gnu gnupg gnupg-l10n gpg gpg-agent
#15 10.50   gpgconf gpgsm libasan8 libassuan9 libatomic1 libbinutils libbrotli1
#15 10.50   libc-dev-bin libc6-dev libcairo2 libcc1-0 libcom-err2 libcrypt-dev
#15 10.50   libctf-nobfd0 libctf0 libcurl3t64-gnutls libdeflate0 libdpkg-perl
#15 10.50   libdrm-amdgpu1 libdrm-common libdrm-intel1 libdrm2 libedit2 libelf1t64
#15 10.50   libexpat1 libfontconfig1 libfreetype6 libgbm1 libgcc-14-dev libgcrypt20
#15 10.50   libgdbm-compat4t64 libgl1-mesa-dri libglvnd0 libglx-mesa0 libglx0
#15 10.50   libgnutls30t64 libgomp1 libgpg-error0 libgpgme11t64 libgpgmepp6t64
#15 10.50   libgprofng0 libgssapi-krb5-2 libhwasan0 libidn2-0 libisl23 libitm1
#15 10.50   libjansson4 libjbig0 libjpeg62-turbo libk5crypto3 libkeyutils1 libkrb5-3
#15 10.50   libkrb5support0 libksba8 liblcms2-2 libldap2 liblerc4 libllvm19 liblsan0
#15 10.50   libmpc3 libmpfr6 libnghttp2-14 libnghttp3-9 libngtcp2-16
#15 10.50   libngtcp2-crypto-gnutls8 libnpth0t64 libnspr4 libnss3 libopenjp2-7
#15 10.50   libp11-kit0 libpciaccess0 libperl5.40 libpixman-1-0 libpng16-16t64
#15 10.50   libpoppler147 libpsl5t64 libquadmath0 librtmp1 libsasl2-2
#15 10.50   libsasl2-modules-db libsensors-config libsensors5 libsframe1 libsharpyuv0
#15 10.50   libssh2-1t64 libstdc++-14-dev libtasn1-6 libtiff6 libtsan2 libubsan1
#15 10.50   libunistring5 libvulkan1 libwayland-server0 libwebp7 libx11-6 libx11-data
#15 10.50   libx11-xcb1 libxau6 libxcb-dri3-0 libxcb-glx0 libxcb-present0 libxcb-randr0
#15 10.50   libxcb-render0 libxcb-shm0 libxcb-sync1 libxcb-xfixes0 libxcb1 libxdmcp6
#15 10.50   libxext6 libxml2 libxrender1 libxshmfence1 libxxf86vm1 libz3-4
#15 10.50   linux-libc-dev make mesa-libgallium patch perl perl-modules-5.40
#15 10.50   pinentry-curses rpcsvc-proto xz-utils
#15 10.51 Suggested packages:
#15 10.51   binutils-doc gprofng-gui binutils-gold bzip2-doc cpp-doc gcc-14-locales
#15 10.51   cpp-14-doc dbus-user-session libpam-systemd pinentry-gnome3 tor
#15 10.51   debian-keyring debian-tag2upload-keyring g++-multilib g++-14-multilib
#15 10.51   gcc-14-doc gcc-multilib manpages-dev autoconf automake libtool flex bison
#15 10.51   gdb gcc-doc gcc-14-multilib gdb-x86-64-linux-gnu gpg-wks-server parcimonie
#15 10.51   xloadimage scdaemon tpm2daemon libc-devtools glibc-doc sensible-utils git
#15 10.51   bzr rng-tools low-memory-monitor gnutls-bin krb5-doc krb5-user
#15 10.51   liblcms2-utils pciutils lm-sensors libstdc++-14-doc make-doc ed
#15 10.51   diffutils-doc perl-doc libterm-readline-gnu-perl
#15 10.51   | libterm-readline-perl-perl libtap-harness-archive-perl pinentry-doc
#15 10.51 Recommended packages:
#15 10.51   fake*** libalgorithm-merge-perl gnupg-utils gpg-wks-client gpgv manpages
#15 10.51   manpages-dev libfile-fcntllock-perl liblocale-gettext-perl libglib2.0-data
#15 10.51   shared-mime-info xdg-user-dirs libgpg-error-l10n krb5-locales libldap-common
#15 10.51   poppler-data publicsuffix libsasl2-modules mesa-vulkan-drivers | vulkan-icd
#15 ...
#17 [frontend builder 5/7] RUN pnpm install --frozen-lockfile
#17 1.757 ! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-10.18.3.tgz
#17 8.597 Lockfile is up to date, resolution step is skipped
#17 9.051 Progress: resolved 1, reused 0, downloaded 0, added 0
#17 9.342 Packages: +480
#17 9.342 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#17 10.05 Progress: resolved 480, reused 0, downloaded 0, added 0
#17 ...
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 11.91 The following NEW packages will be installed:
#15 11.91   binutils binutils-common binutils-x86-64-linux-gnu build-essential bzip2 cpp
#15 11.91   cpp-14 cpp-14-x86-64-linux-gnu cpp-x86-64-linux-gnu dirmngr dpkg-dev
#15 11.91   fontconfig-config fonts-dejavu-core fonts-dejavu-mono g++ g++-14
#15 11.91   g++-14-x86-64-linux-gnu g++-x86-64-linux-gnu gcc gcc-14
#15 11.91   gcc-14-x86-64-linux-gnu gcc-x86-64-linux-gnu gnupg gnupg-l10n gpg gpg-agent
#15 11.91   gpgconf gpgsm libasan8 libassuan9 libatomic1 libbinutils libbrotli1
#15 11.91   libc-dev-bin libc6-dev libcairo2 libcc1-0 libcom-err2 libcrypt-dev
#15 11.91   libctf-nobfd0 libctf0 libcurl3t64-gnutls libdeflate0 libdpkg-perl
#15 11.91   libdrm-amdgpu1 libdrm-common libdrm-intel1 libdrm2 libedit2 libelf1t64
#15 11.91   libexpat1 libfontconfig1 libfreetype6 libgbm1 libgcc-14-dev libgcrypt20
#15 11.91   libgdbm-compat4t64 libgl1 libgl1-mesa-dri libglib2.0-0t64 libglvnd0
#15 11.91   libglx-mesa0 libglx0 libgnutls30t64 libgomp1 libgpg-error0 libgpgme11t64
#15 11.91   libgpgmepp6t64 libgprofng0 libgssapi-krb5-2 libhwasan0 libidn2-0 libisl23
#15 11.91   libitm1 libjansson4 libjbig0 libjpeg62-turbo libk5crypto3 libkeyutils1
#15 11.91   libkrb5-3 libkrb5support0 libksba8 liblcms2-2 libldap2 liblerc4 libllvm19
#15 11.91   liblsan0 libmpc3 libmpfr6 libnghttp2-14 libnghttp3-9 libngtcp2-16
#15 11.91   libngtcp2-crypto-gnutls8 libnpth0t64 libnspr4 libnss3 libopenjp2-7
#15 11.91   libp11-kit0 libpciaccess0 libperl5.40 libpixman-1-0 libpng16-16t64
#15 11.91   libpoppler147 libpsl5t64 libquadmath0 librtmp1 libsasl2-2
#15 11.91   libsasl2-modules-db libsensors-config libsensors5 libsframe1 libsharpyuv0
#15 11.91   libssh2-1t64 libstdc++-14-dev libtasn1-6 libtiff6 libtsan2 libubsan1
#15 11.91   libunistring5 libvulkan1 libwayland-server0 libwebp7 libx11-6 libx11-data
#15 11.91   libx11-xcb1 libxau6 libxcb-dri3-0 libxcb-glx0 libxcb-present0 libxcb-randr0
#15 11.91   libxcb-render0 libxcb-shm0 libxcb-sync1 libxcb-xfixes0 libxcb1 libxdmcp6
#15 11.91   libxext6 libxml2 libxrender1 libxshmfence1 libxxf86vm1 libz3-4
#15 11.91   linux-libc-dev make mesa-libgallium patch perl perl-modules-5.40
#15 11.91   pinentry-curses poppler-utils rpcsvc-proto xz-utils
#15 12.02 0 upgraded, 152 newly installed, 0 to remove and 0 not upgraded.
#15 12.02 Need to get 151 MB of archives.
#15 12.02 After this operation, 606 MB of additional disk space will be used.
#15 12.02 Get:1 http://deb.debian.org/debian trixie/main amd64 libexpat1 amd64 2.7.1-2 [108 kB]
#15 12.03 Get:2 http://deb.debian.org/debian trixie/main amd64 bzip2 amd64 1.0.8-6 [40.5 kB]
#15 12.03 Get:3 http://deb.debian.org/debian trixie/main amd64 perl-modules-5.40 all 5.40.1-6 [3019 kB]
#15 12.08 Get:4 http://deb.debian.org/debian trixie/main amd64 libgdbm-compat4t64 amd64 1.24-2 [50.3 kB]
#15 12.08 Get:5 http://deb.debian.org/debian trixie/main amd64 libperl5.40 amd64 5.40.1-6 [4341 kB]
#15 12.47 Get:6 http://deb.debian.org/debian trixie/main amd64 perl amd64 5.40.1-6 [267 kB]
#15 12.48 Get:7 http://deb.debian.org/debian trixie/main amd64 xz-utils amd64 5.8.1-1 [660 kB]
#15 12.54 Get:8 http://deb.debian.org/debian trixie/main amd64 libsframe1 amd64 2.44-3 [78.4 kB]
#15 12.55 Get:9 http://deb.debian.org/debian trixie/main amd64 binutils-common amd64 2.44-3 [2509 kB]
#15 12.65 Get:10 http://deb.debian.org/debian trixie/main amd64 libbinutils amd64 2.44-3 [534 kB]
#15 12.69 Get:11 http://deb.debian.org/debian trixie/main amd64 libgprofng0 amd64 2.44-3 [808 kB]
#15 12.74 Get:12 http://deb.debian.org/debian trixie/main amd64 libctf-nobfd0 amd64 2.44-3 [156 kB]
#15 12.75 Get:13 http://deb.debian.org/debian trixie/main amd64 libctf0 amd64 2.44-3 [88.6 kB]
#15 12.75 Get:14 http://deb.debian.org/debian trixie/main amd64 libjansson4 amd64 2.14-2+b3 [39.8 kB]
#15 12.76 Get:15 http://deb.debian.org/debian trixie/main amd64 binutils-x86-64-linux-gnu amd64 2.44-3 [1014 kB]
#15 12.83 Get:16 http://deb.debian.org/debian trixie/main amd64 binutils amd64 2.44-3 [265 kB]
#15 12.85 Get:17 http://deb.debian.org/debian trixie/main amd64 libc-dev-bin amd64 2.41-12 [58.2 kB]
#15 12.86 Get:18 http://deb.debian.org/debian-security trixie-security/main amd64 linux-libc-dev all 6.12.48-1 [2671 kB]
#15 13.06 Get:19 http://deb.debian.org/debian trixie/main amd64 libcrypt-dev amd64 1:4.4.38-1 [119 kB]
#15 13.07 Get:20 http://deb.debian.org/debian trixie/main amd64 rpcsvc-proto amd64 1.4.3-1 [63.3 kB]
#15 13.07 Get:21 http://deb.debian.org/debian trixie/main amd64 libc6-dev amd64 2.41-12 [1991 kB]
#15 13.21 Get:*** http://deb.debian.org/debian trixie/main amd64 libisl23 amd64 0.27-1 [659 kB]
#15 13.26 Get:23 http://deb.debian.org/debian trixie/main amd64 libmpfr6 amd64 4.2.2-1 [729 kB]
#15 13.32 Get:24 http://deb.debian.org/debian trixie/main amd64 libmpc3 amd64 1.3.1-1+b3 [52.2 kB]
#15 13.33 Get:25 http://deb.debian.org/debian trixie/main amd64 cpp-14-x86-64-linux-gnu amd64 14.2.0-19 [11.0 MB]
#15 13.90 Get:26 http://deb.debian.org/debian trixie/main amd64 cpp-14 amd64 14.2.0-19 [1280 B]
#15 13.90 Get:27 http://deb.debian.org/debian trixie/main amd64 cpp-x86-64-linux-gnu amd64 4:14.2.0-1 [4840 B]
#15 13.91 Get:28 http://deb.debian.org/debian trixie/main amd64 cpp amd64 4:14.2.0-1 [1568 B]
#15 13.91 Get:29 http://deb.debian.org/debian trixie/main amd64 libcc1-0 amd64 14.2.0-19 [42.8 kB]
#15 13.92 Get:30 http://deb.debian.org/debian trixie/main amd64 libgomp1 amd64 14.2.0-19 [137 kB]
#15 13.92 Get:31 http://deb.debian.org/debian trixie/main amd64 libitm1 amd64 14.2.0-19 [26.0 kB]
#15 13.93 Get:32 http://deb.debian.org/debian trixie/main amd64 libatomic1 amd64 14.2.0-19 [9308 B]
#15 13.93 Get:33 http://deb.debian.org/debian trixie/main amd64 libasan8 amd64 14.2.0-19 [2725 kB]
#15 14.01 Get:34 http://deb.debian.org/debian trixie/main amd64 liblsan0 amd64 14.2.0-19 [1204 kB]
#15 14.07 Get:35 http://deb.debian.org/debian trixie/main amd64 libtsan2 amd64 14.2.0-19 [2460 kB]
#15 14.20 Get:36 http://deb.debian.org/debian trixie/main amd64 libubsan1 amd64 14.2.0-19 [1074 kB]
#15 14.26 Get:37 http://deb.debian.org/debian trixie/main amd64 libhwasan0 amd64 14.2.0-19 [1488 kB]
#15 14.30 Get:38 http://deb.debian.org/debian trixie/main amd64 libquadmath0 amd64 14.2.0-19 [145 kB]
#15 14.31 Get:39 http://deb.debian.org/debian trixie/main amd64 libgcc-14-dev amd64 14.2.0-19 [2672 kB]
#15 14.45 Get:40 http://deb.debian.org/debian trixie/main amd64 gcc-14-x86-64-linux-gnu amd64 14.2.0-19 [21.4 MB]
#15 15.16 Get:41 http://deb.debian.org/debian trixie/main amd64 gcc-14 amd64 14.2.0-19 [540 kB]
#15 15.20 Get:42 http://deb.debian.org/debian trixie/main amd64 gcc-x86-64-linux-gnu amd64 4:14.2.0-1 [1436 B]
#15 15.20 Get:43 http://deb.debian.org/debian trixie/main amd64 gcc amd64 4:14.2.0-1 [5136 B]
#15 15.21 Get:44 http://deb.debian.org/debian trixie/main amd64 libstdc++-14-dev amd64 14.2.0-19 [2376 kB]
#15 15.31 Get:45 http://deb.debian.org/debian trixie/main amd64 g++-14-x86-64-linux-gnu amd64 14.2.0-19 [12.1 MB]
#15 15.65 Get:46 http://deb.debian.org/debian trixie/main amd64 g++-14 amd64 14.2.0-19 [***.5 kB]
#15 15.66 Get:47 http://deb.debian.org/debian trixie/main amd64 g++-x86-64-linux-gnu amd64 4:14.2.0-1 [1200 B]
#15 15.66 Get:48 http://deb.debian.org/debian trixie/main amd64 g++ amd64 4:14.2.0-1 [1344 B]
#15 15.66 Get:49 http://deb.debian.org/debian trixie/main amd64 make amd64 4.4.1-2 [463 kB]
#15 15.67 Get:50 http://deb.debian.org/debian trixie/main amd64 libdpkg-perl all 1.***.21 [650 kB]
#15 15.68 Get:51 http://deb.debian.org/debian trixie/main amd64 patch amd64 2.8-2 [134 kB]
#15 15.68 Get:52 http://deb.debian.org/debian trixie/main amd64 dpkg-dev all 1.***.21 [1338 kB]
#15 15.70 Get:53 http://deb.debian.org/debian trixie/main amd64 build-essential amd64 12.12 [4624 B]
#15 15.71 Get:54 http://deb.debian.org/debian trixie/main amd64 libgpg-error0 amd64 1.51-4 [82.1 kB]
#15 15.71 Get:55 http://deb.debian.org/debian trixie/main amd64 libassuan9 amd64 3.0.2-2 [61.5 kB]
#15 15.71 Get:56 http://deb.debian.org/debian trixie/main amd64 libgcrypt20 amd64 1.11.0-7 [843 kB]
#15 15.72 Get:57 http://deb.debian.org/debian trixie/main amd64 gpgconf amd64 2.4.7-21+b3 [129 kB]
#15 15.73 Get:58 http://deb.debian.org/debian trixie/main amd64 libunistring5 amd64 1.3-2 [477 kB]
#15 15.75 Get:59 http://deb.debian.org/debian trixie/main amd64 libidn2-0 amd64 2.3.8-2 [109 kB]
#15 15.75 Get:60 http://deb.debian.org/debian trixie/main amd64 libp11-kit0 amd64 0.25.5-3 [425 kB]
#15 15.76 Get:61 http://deb.debian.org/debian trixie/main amd64 libtasn1-6 amd64 4.20.0-2 [49.9 kB]
#15 15.76 Get:62 http://deb.debian.org/debian trixie/main amd64 libgnutls30t64 amd64 3.8.9-3 [1465 kB]
#15 15.78 Get:63 http://deb.debian.org/debian trixie/main amd64 libksba8 amd64 1.6.7-2+b1 [136 kB]
#15 15.79 Get:64 http://deb.debian.org/debian trixie/main amd64 libsasl2-modules-db amd64 2.1.28+dfsg1-9 [19.8 kB]
#15 15.79 Get:65 http://deb.debian.org/debian trixie/main amd64 libsasl2-2 amd64 2.1.28+dfsg1-9 [57.5 kB]
#15 15.79 Get:66 http://deb.debian.org/debian trixie/main amd64 libldap2 amd64 2.6.10+dfsg-1 [194 kB]
#15 15.80 Get:67 http://deb.debian.org/debian trixie/main amd64 libnpth0t64 amd64 1.8-3 [23.2 kB]
#15 15.80 Get:68 http://deb.debian.org/debian trixie/main amd64 dirmngr amd64 2.4.7-21+b3 [384 kB]
#15 15.81 Get:69 http://deb.debian.org/debian trixie/main amd64 fonts-dejavu-mono all 2.37-8 [489 kB]
#15 15.82 Get:70 http://deb.debian.org/debian trixie/main amd64 fonts-dejavu-core all 2.37-8 [840 kB]
#15 15.83 Get:71 http://deb.debian.org/debian trixie/main amd64 fontconfig-config amd64 2.15.0-2.3 [318 kB]
#15 15.83 Get:72 http://deb.debian.org/debian trixie/main amd64 gnupg-l10n all 2.4.7-21 [747 kB]
#15 15.90 Get:73 http://deb.debian.org/debian trixie/main amd64 gpg amd64 2.4.7-21+b3 [634 kB]
#15 15.92 Get:74 http://deb.debian.org/debian trixie/main amd64 pinentry-curses amd64 1.3.1-2 [86.4 kB]
#15 15.93 Get:75 http://deb.debian.org/debian trixie/main amd64 gpg-agent amd64 2.4.7-21+b3 [271 kB]
#15 15.97 Get:76 http://deb.debian.org/debian trixie/main amd64 gpgsm amd64 2.4.7-21+b3 [275 kB]
#15 16.00 Get:77 http://deb.debian.org/debian trixie/main amd64 gnupg all 2.4.7-21 [417 kB]
#15 16.03 Get:78 http://deb.debian.org/debian trixie/main amd64 libbrotli1 amd64 1.1.0-2+b7 [307 kB]
#15 16.05 Get:79 http://deb.debian.org/debian trixie/main amd64 libpng16-16t64 amd64 1.6.48-1 [282 kB]
#15 16.08 Get:80 http://deb.debian.org/debian trixie/main amd64 libfreetype6 amd64 2.13.3+dfsg-1 [452 kB]
#15 16.10 Get:81 http://deb.debian.org/debian trixie/main amd64 libfontconfig1 amd64 2.15.0-2.3 [392 kB]
#15 16.10 Get:82 http://deb.debian.org/debian trixie/main amd64 libpixman-1-0 amd64 0.44.0-3 [248 kB]
#15 16.11 Get:83 http://deb.debian.org/debian trixie/main amd64 libxau6 amd64 1:1.0.11-1 [20.4 kB]
#15 16.11 Get:84 http://deb.debian.org/debian trixie/main amd64 libxdmcp6 amd64 1:1.1.5-1 [27.8 kB]
#15 16.11 Get:85 http://deb.debian.org/debian trixie/main amd64 libxcb1 amd64 1.17.0-2+b1 [144 kB]
#15 16.11 Get:86 http://deb.debian.org/debian trixie/main amd64 libx11-data all 2:1.8.12-1 [343 kB]
#15 16.12 Get:87 http://deb.debian.org/debian trixie/main amd64 libx11-6 amd64 2:1.8.12-1 [815 kB]
#15 16.16 Get:88 http://deb.debian.org/debian trixie/main amd64 libxcb-render0 amd64 1.17.0-2+b1 [115 kB]
#15 16.17 Get:89 http://deb.debian.org/debian trixie/main amd64 libxcb-shm0 amd64 1.17.0-2+b1 [105 kB]
#15 16.18 Get:90 http://deb.debian.org/debian trixie/main amd64 libxext6 amd64 2:1.3.4-1+b3 [50.4 kB]
#15 16.18 Get:91 http://deb.debian.org/debian trixie/main amd64 libxrender1 amd64 1:0.9.12-1 [27.9 kB]
#15 16.18 Get:92 http://deb.debian.org/debian trixie/main amd64 libcairo2 amd64 1.18.4-1+b1 [538 kB]
#15 16.*** Get:93 http://deb.debian.org/debian trixie/main amd64 libcom-err2 amd64 1.47.2-3+b3 [25.0 kB]
#15 16.*** Get:94 http://deb.debian.org/debian trixie/main amd64 libkrb5support0 amd64 1.21.3-5 [33.0 kB]
#15 16.23 Get:95 http://deb.debian.org/debian trixie/main amd64 libk5crypto3 amd64 1.21.3-5 [81.5 kB]
#15 16.24 Get:96 http://deb.debian.org/debian trixie/main amd64 libkeyutils1 amd64 1.6.3-6 [9456 B]
#15 16.24 Get:97 http://deb.debian.org/debian trixie/main amd64 libkrb5-3 amd64 1.21.3-5 [326 kB]
#15 16.27 Get:98 http://deb.debian.org/debian trixie/main amd64 libgssapi-krb5-2 amd64 1.21.3-5 [138 kB]
#15 16.27 Get:99 http://deb.debian.org/debian trixie/main amd64 libnghttp2-14 amd64 1.64.0-1.1 [76.0 kB]
#15 16.28 Get:100 http://deb.debian.org/debian trixie/main amd64 libnghttp3-9 amd64 1.8.0-1 [67.7 kB]
#15 16.29 Get:101 http://deb.debian.org/debian trixie/main amd64 libngtcp2-16 amd64 1.11.0-1 [131 kB]
#15 16.30 Get:102 http://deb.debian.org/debian trixie/main amd64 libngtcp2-crypto-gnutls8 amd64 1.11.0-1 [29.3 kB]
#15 16.30 Get:103 http://deb.debian.org/debian trixie/main amd64 libpsl5t64 amd64 0.21.2-1.1+b1 [57.2 kB]
#15 16.31 Get:104 http://deb.debian.org/debian trixie/main amd64 librtmp1 amd64 2.4+20151***3.gitfa8646d.1-2+b5 [58.8 kB]
#15 16.32 Get:105 http://deb.debian.org/debian trixie/main amd64 libssh2-1t64 amd64 1.11.1-1 [245 kB]
#15 16.34 Get:106 http://deb.debian.org/debian trixie/main amd64 libcurl3t64-gnutls amd64 8.14.1-2 [384 kB]
#15 16.35 Get:107 http://deb.debian.org/debian trixie/main amd64 libdeflate0 amd64 1.23-2 [47.3 kB]
#15 16.35 Get:108 http://deb.debian.org/debian trixie/main amd64 libdrm-common all 2.4.124-2 [8288 B]
#15 16.35 Get:109 http://deb.debian.org/debian trixie/main amd64 libdrm2 amd64 2.4.124-2 [39.0 kB]
#15 16.36 Get:110 http://deb.debian.org/debian trixie/main amd64 libdrm-amdgpu1 amd64 2.4.124-2 [***.6 kB]
#15 16.36 Get:111 http://deb.debian.org/debian trixie/main amd64 libpciaccess0 amd64 0.17-3+b3 [51.9 kB]
#15 16.37 Get:112 http://deb.debian.org/debian trixie/main amd64 libdrm-intel1 amd64 2.4.124-2 [64.1 kB]
#15 16.38 Get:113 http://deb.debian.org/debian trixie/main amd64 libedit2 amd64 3.1-20250104-1 [93.8 kB]
#15 16.38 Get:114 http://deb.debian.org/debian trixie/main amd64 libelf1t64 amd64 0.192-4 [189 kB]
#15 16.40 Get:115 http://deb.debian.org/debian trixie/main amd64 libwayland-server0 amd64 1.23.1-3 [34.4 kB]
#15 16.40 Get:116 http://deb.debian.org/debian trixie/main amd64 libxml2 amd64 2.12.7+dfsg+really2.9.14-2.1+deb13u1 [698 kB]
#15 16.43 Get:117 http://deb.debian.org/debian trixie/main amd64 libz3-4 amd64 4.13.3-1 [8560 kB]
#15 16.68 Get:118 http://deb.debian.org/debian trixie/main amd64 libllvm19 amd64 1:19.1.7-3+b1 [26.0 MB]
#15 17.63 Get:119 http://deb.debian.org/debian trixie/main amd64 libsensors-config all 1:3.6.2-2 [16.2 kB]
#15 17.63 Get:120 http://deb.debian.org/debian trixie/main amd64 libsensors5 amd64 1:3.6.2-2 [37.5 kB]
#15 17.63 Get:121 http://deb.debian.org/debian trixie/main amd64 libx11-xcb1 amd64 2:1.8.12-1 [247 kB]
#15 17.64 Get:1*** http://deb.debian.org/debian trixie/main amd64 libxcb-dri3-0 amd64 1.17.0-2+b1 [107 kB]
#15 17.65 Get:123 http://deb.debian.org/debian trixie/main amd64 libxcb-present0 amd64 1.17.0-2+b1 [106 kB]
#15 17.65 Get:124 http://deb.debian.org/debian trixie/main amd64 libxcb-randr0 amd64 1.17.0-2+b1 [117 kB]
#15 17.66 Get:125 http://deb.debian.org/debian trixie/main amd64 libxcb-sync1 amd64 1.17.0-2+b1 [109 kB]
#15 17.66 Get:126 http://deb.debian.org/debian trixie/main amd64 libxcb-xfixes0 amd64 1.17.0-2+b1 [109 kB]
#15 17.66 Get:127 http://deb.debian.org/debian trixie/main amd64 libxshmfence1 amd64 1.3.3-1 [10.9 kB]
#15 17.67 Get:128 http://deb.debian.org/debian trixie/main amd64 mesa-libgallium amd64 25.0.7-2 [9629 kB]
#15 18.*** Get:129 http://deb.debian.org/debian trixie/main amd64 libgbm1 amd64 25.0.7-2 [44.4 kB]
#15 18.*** Get:130 http://deb.debian.org/debian trixie/main amd64 libglvnd0 amd64 1.7.0-1+b2 [52.0 kB]
#15 18.23 Get:131 http://deb.debian.org/debian trixie/main amd64 libxcb-glx0 amd64 1.17.0-2+b1 [1*** kB]
#15 18.23 Get:132 http://deb.debian.org/debian trixie/main amd64 libxxf86vm1 amd64 1:1.1.4-1+b4 [19.3 kB]
#15 18.23 Get:133 http://deb.debian.org/debian trixie/main amd64 libvulkan1 amd64 1.4.309.0-1 [130 kB]
#15 18.23 Get:134 http://deb.debian.org/debian trixie/main amd64 libgl1-mesa-dri amd64 25.0.7-2 [46.1 kB]
#15 18.23 Get:135 http://deb.debian.org/debian trixie/main amd64 libglx-mesa0 amd64 25.0.7-2 [143 kB]
#15 18.24 Get:136 http://deb.debian.org/debian trixie/main amd64 libglx0 amd64 1.7.0-1+b2 [34.9 kB]
#15 18.24 Get:137 http://deb.debian.org/debian trixie/main amd64 libgl1 amd64 1.7.0-1+b2 [89.5 kB]
#15 18.24 Get:138 http://deb.debian.org/debian trixie/main amd64 libglib2.0-0t64 amd64 2.84.4-3~deb13u1 [1519 kB]
#15 18.31 Get:139 http://deb.debian.org/debian trixie/main amd64 libgpgme11t64 amd64 1.24.2-3 [346 kB]
#15 18.34 Get:140 http://deb.debian.org/debian trixie/main amd64 libgpgmepp6t64 amd64 1.24.2-3 [341 kB]
#15 18.36 Get:141 http://deb.debian.org/debian trixie/main amd64 libjbig0 amd64 2.1-6.1+b2 [32.1 kB]
#15 18.36 Get:142 http://deb.debian.org/debian trixie/main amd64 libjpeg62-turbo amd64 1:2.1.5-4 [168 kB]
#15 18.37 Get:143 http://deb.debian.org/debian trixie/main amd64 liblcms2-2 amd64 2.16-2 [160 kB]
#15 18.38 Get:144 http://deb.debian.org/debian trixie/main amd64 liblerc4 amd64 4.0.0+ds-5 [183 kB]
#15 18.39 Get:145 http://deb.debian.org/debian trixie/main amd64 libnspr4 amd64 2:4.36-1 [110 kB]
#15 18.40 Get:146 http://deb.debian.org/debian trixie/main amd64 libnss3 amd64 2:3.110-1 [1393 kB]
#15 18.44 Get:147 http://deb.debian.org/debian trixie/main amd64 libopenjp2-7 amd64 2.5.3-2.1~deb13u1 [205 kB]
#15 18.44 Get:148 http://deb.debian.org/debian trixie/main amd64 libsharpyuv0 amd64 1.5.0-0.1 [116 kB]
#15 18.45 Get:149 http://deb.debian.org/debian trixie/main amd64 libwebp7 amd64 1.5.0-0.1 [318 kB]
#15 18.45 Get:150 http://deb.debian.org/debian-security trixie-security/main amd64 libtiff6 amd64 4.7.0-3+deb13u1 [346 kB]
#15 18.46 Get:151 http://deb.debian.org/debian trixie/main amd64 libpoppler147 amd64 25.03.0-5 [2034 kB]
#15 18.47 Get:152 http://deb.debian.org/debian trixie/main amd64 poppler-utils amd64 25.03.0-5 [213 kB]
#15 19.32 debconf: unable to initialize frontend: Dialog
#15 19.32 debconf: (TERM is not set, so the dialog frontend is not usable.)
#15 19.32 debconf: falling back to frontend: Readline
#15 19.32 debconf: unable to initialize frontend: Readline
#15 19.32 debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC entries checked: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.40.1 /usr/local/share/perl/5.40.1 /usr/lib/x86_64-linux-gnu/perl5/5.40 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl-base /usr/lib/x86_64-linux-gnu/perl/5.40 /usr/share/perl/5.40 /usr/local/lib/site_perl) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 8, <STDIN> line 152.)
#15 19.32 debconf: falling back to frontend: Teletype
#15 19.34 debconf: unable to initialize frontend: Teletype
#15 19.34 debconf: (This frontend requires a controlling tty.)
#15 19.34 debconf: falling back to frontend: Noninteractive
#15 ...
#17 [frontend builder 5/7] RUN pnpm install --frozen-lockfile
#17 11.06 Progress: resolved 480, reused 0, downloaded 4, added 0
#17 12.07 Progress: resolved 480, reused 0, downloaded 6, added 0
#17 13.07 Progress: resolved 480, reused 0, downloaded 11, added 0
#17 14.08 Progress: resolved 480, reused 0, downloaded 16, added 0
#17 15.08 Progress: resolved 480, reused 0, downloaded 32, added 4
#17 16.10 Progress: resolved 480, reused 0, downloaded 51, added 12
#17 17.10 Progress: resolved 480, reused 0, downloaded 66, added 20
#17 18.11 Progress: resolved 480, reused 0, downloaded 77, added 24
#17 19.12 Progress: resolved 480, reused 0, downloaded 80, added 24
#17 20.12 Progress: resolved 480, reused 0, downloaded 97, added 28
#17 21.18 Progress: resolved 480, reused 0, downloaded 113, added 32
#17 ***.21 Progress: resolved 480, reused 0, downloaded 115, added 33
#17 23.26 Progress: resolved 480, reused 0, downloaded 121, added 36
#17 24.65 Progress: resolved 480, reused 0, downloaded 124, added 36
#17 25.65 Progress: resolved 480, reused 0, downloaded 136, added 40
#17 28.54 Progress: resolved 480, reused 0, downloaded 137, added 40
#17 29.55 Progress: resolved 480, reused 0, downloaded 139, added 40
#17 ...
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 36.02 Preconfiguring packages ...
#15 36.37 Fetched 151 MB in 6s (23.2 MB/s)
#15 36.50 Selecting previously unselected package libexpat1:amd64.
#15 36.50 (Reading database ... 
(Reading database ... 5%
(Reading database ... 10%
(Reading database ... 15%
(Reading database ... 20%
(Reading database ... 25%
(Reading database ... 30%
(Reading database ... 35%
(Reading database ... 40%
(Reading database ... 45%
(Reading database ... 50%
(Reading database ... 55%
(Reading database ... 60%
(Reading database ... 65%
(Reading database ... 70%
(Reading database ... 75%
(Reading database ... 80%
(Reading database ... 85%
(Reading database ... 90%
(Reading database ... 95%
(Reading database ... 100%
(Reading database ... 5644 files and directories currently installed.)
#15 36.57 Preparing to unpack .../000-libexpat1_2.7.1-2_amd64.deb ...
#15 36.60 Unpacking libexpat1:amd64 (2.7.1-2) ...
#15 36.69 Selecting previously unselected package bzip2.
#15 36.69 Preparing to unpack .../001-bzip2_1.0.8-6_amd64.deb ...
#15 36.70 Unpacking bzip2 (1.0.8-6) ...
#15 36.76 Selecting previously unselected package perl-modules-5.40.
#15 36.76 Preparing to unpack .../002-perl-modules-5.40_5.40.1-6_all.deb ...
#15 36.77 Unpacking perl-modules-5.40 (5.40.1-6) ...
#15 37.93 Selecting previously unselected package libgdbm-compat4t64:amd64.
#15 37.94 Preparing to unpack .../003-libgdbm-compat4t64_1.24-2_amd64.deb ...
#15 37.94 Unpacking libgdbm-compat4t64:amd64 (1.24-2) ...
#15 38.05 Selecting previously unselected package libperl5.40:amd64.
#15 38.06 Preparing to unpack .../004-libperl5.40_5.40.1-6_amd64.deb ...
#15 38.07 Unpacking libperl5.40:amd64 (5.40.1-6) ...
#15 39.19 Selecting previously unselected package perl.
#15 39.20 Preparing to unpack .../005-perl_5.40.1-6_amd64.deb ...
#15 39.21 Unpacking perl (5.40.1-6) ...
#15 39.33 Selecting previously unselected package xz-utils.
#15 39.34 Preparing to unpack .../006-xz-utils_5.8.1-1_amd64.deb ...
#15 39.35 Unpacking xz-utils (5.8.1-1) ...
#15 39.52 Selecting previously unselected package libsframe1:amd64.
#15 39.52 Preparing to unpack .../007-libsframe1_2.44-3_amd64.deb ...
#15 39.53 Unpacking libsframe1:amd64 (2.44-3) ...
#15 39.59 Selecting previously unselected package binutils-common:amd64.
#15 39.60 Preparing to unpack .../008-binutils-common_2.44-3_amd64.deb ...
#15 39.61 Unpacking binutils-common:amd64 (2.44-3) ...
#15 40.00 Selecting previously unselected package libbinutils:amd64.
#15 40.01 Preparing to unpack .../009-libbinutils_2.44-3_amd64.deb ...
#15 40.01 Unpacking libbinutils:amd64 (2.44-3) ...
#15 40.15 Selecting previously unselected package libgprofng0:amd64.
#15 40.16 Preparing to unpack .../010-libgprofng0_2.44-3_amd64.deb ...
#15 40.16 Unpacking libgprofng0:amd64 (2.44-3) ...
#15 40.39 Selecting previously unselected package libctf-nobfd0:amd64.
#15 40.40 Preparing to unpack .../011-libctf-nobfd0_2.44-3_amd64.deb ...
#15 40.40 Unpacking libctf-nobfd0:amd64 (2.44-3) ...
#15 40.49 Selecting previously unselected package libctf0:amd64.
#15 40.49 Preparing to unpack .../012-libctf0_2.44-3_amd64.deb ...
#15 40.50 Unpacking libctf0:amd64 (2.44-3) ...
#15 40.58 Selecting previously unselected package libjansson4:amd64.
#15 40.58 Preparing to unpack .../013-libjansson4_2.14-2+b3_amd64.deb ...
#15 40.59 Unpacking libjansson4:amd64 (2.14-2+b3) ...
#15 40.65 Selecting previously unselected package binutils-x86-64-linux-gnu.
#15 40.66 Preparing to unpack .../014-binutils-x86-64-linux-gnu_2.44-3_amd64.deb ...
#15 40.67 Unpacking binutils-x86-64-linux-gnu (2.44-3) ...
#15 41.03 Selecting previously unselected package binutils.
#15 41.04 Preparing to unpack .../015-binutils_2.44-3_amd64.deb ...
#15 41.04 Unpacking binutils (2.44-3) ...
#15 41.15 Selecting previously unselected package libc-dev-bin.
#15 41.15 Preparing to unpack .../016-libc-dev-bin_2.41-12_amd64.deb ...
#15 41.16 Unpacking libc-dev-bin (2.41-12) ...
#15 41.23 Selecting previously unselected package linux-libc-dev.
#15 41.24 Preparing to unpack .../017-linux-libc-dev_6.12.48-1_all.deb ...
#15 41.24 Unpacking linux-libc-dev (6.12.48-1) ...
#15 42.69 Selecting previously unselected package libcrypt-dev:amd64.
#15 42.70 Preparing to unpack .../018-libcrypt-dev_1%3a4.4.38-1_amd64.deb ...
#15 42.75 Unpacking libcrypt-dev:amd64 (1:4.4.38-1) ...
#15 42.91 Selecting previously unselected package rpcsvc-proto.
#15 42.92 Preparing to unpack .../019-rpcsvc-proto_1.4.3-1_amd64.deb ...
#15 42.93 Unpacking rpcsvc-proto (1.4.3-1) ...
#15 43.06 Selecting previously unselected package libc6-dev:amd64.
#15 43.07 Preparing to unpack .../020-libc6-dev_2.41-12_amd64.deb ...
#15 43.08 Unpacking libc6-dev:amd64 (2.41-12) ...
#15 43.82 Selecting previously unselected package libisl23:amd64.
#15 43.82 Preparing to unpack .../021-libisl23_0.27-1_amd64.deb ...
#15 43.83 Unpacking libisl23:amd64 (0.27-1) ...
#15 43.98 Selecting previously unselected package libmpfr6:amd64.
#15 43.99 Preparing to unpack .../0***-libmpfr6_4.2.2-1_amd64.deb ...
#15 44.00 Unpacking libmpfr6:amd64 (4.2.2-1) ...
#15 44.10 Selecting previously unselected package libmpc3:amd64.
#15 44.10 Preparing to unpack .../023-libmpc3_1.3.1-1+b3_amd64.deb ...
#15 44.11 Unpacking libmpc3:amd64 (1.3.1-1+b3) ...
#15 44.16 Selecting previously unselected package cpp-14-x86-64-linux-gnu.
#15 44.16 Preparing to unpack .../024-cpp-14-x86-64-linux-gnu_14.2.0-19_amd64.deb ...
#15 44.17 Unpacking cpp-14-x86-64-linux-gnu (14.2.0-19) ...
#15 46.09 Selecting previously unselected package cpp-14.
#15 46.10 Preparing to unpack .../025-cpp-14_14.2.0-19_amd64.deb ...
#15 46.10 Unpacking cpp-14 (14.2.0-19) ...
#15 46.15 Selecting previously unselected package cpp-x86-64-linux-gnu.
#15 46.15 Preparing to unpack .../026-cpp-x86-64-linux-gnu_4%3a14.2.0-1_amd64.deb ...
#15 46.16 Unpacking cpp-x86-64-linux-gnu (4:14.2.0-1) ...
#15 46.21 Selecting previously unselected package cpp.
#15 46.21 Preparing to unpack .../027-cpp_4%3a14.2.0-1_amd64.deb ...
#15 46.23 Unpacking cpp (4:14.2.0-1) ...
#15 46.37 Selecting previously unselected package libcc1-0:amd64.
#15 46.38 Preparing to unpack .../028-libcc1-0_14.2.0-19_amd64.deb ...
#15 46.41 Unpacking libcc1-0:amd64 (14.2.0-19) ...
#15 46.49 Selecting previously unselected package libgomp1:amd64.
#15 46.49 Preparing to unpack .../029-libgomp1_14.2.0-19_amd64.deb ...
#15 46.50 Unpacking libgomp1:amd64 (14.2.0-19) ...
#15 46.56 Selecting previously unselected package libitm1:amd64.
#15 46.57 Preparing to unpack .../030-libitm1_14.2.0-19_amd64.deb ...
#15 46.57 Unpacking libitm1:amd64 (14.2.0-19) ...
#15 ...
#17 [frontend builder 5/7] RUN pnpm install --frozen-lockfile
#17 35.11 Progress: resolved 480, reused 0, downloaded 140, added 40
#17 36.13 Progress: resolved 480, reused 0, downloaded 144, added 41
#17 38.11 Progress: resolved 480, reused 0, downloaded 145, added 41
#17 39.11 Progress: resolved 480, reused 0, downloaded 148, added 44
#17 40.11 Progress: resolved 480, reused 0, downloaded 157, added 45
#17 41.11 Progress: resolved 480, reused 0, downloaded 163, added 48
#17 42.13 Progress: resolved 480, reused 0, downloaded 186, added 53
#17 43.14 Progress: resolved 480, reused 0, downloaded 205, added 60
#17 44.14 Progress: resolved 480, reused 0, downloaded 218, added 64
#17 45.14 Progress: resolved 480, reused 0, downloaded 263, added 79
#17 ...
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 46.63 Selecting previously unselected package libatomic1:amd64.
#15 46.64 Preparing to unpack .../031-libatomic1_14.2.0-19_amd64.deb ...
#15 46.65 Unpacking libatomic1:amd64 (14.2.0-19) ...
#15 46.72 Selecting previously unselected package libasan8:amd64.
#15 46.73 Preparing to unpack .../032-libasan8_14.2.0-19_amd64.deb ...
#15 46.73 Unpacking libasan8:amd64 (14.2.0-19) ...
#15 47.14 Selecting previously unselected package liblsan0:amd64.
#15 47.15 Preparing to unpack .../033-liblsan0_14.2.0-19_amd64.deb ...
#15 47.15 Unpacking liblsan0:amd64 (14.2.0-19) ...
#15 47.45 Selecting previously unselected package libtsan2:amd64.
#15 47.45 Preparing to unpack .../034-libtsan2_14.2.0-19_amd64.deb ...
#15 47.46 Unpacking libtsan2:amd64 (14.2.0-19) ...
#15 47.97 Selecting previously unselected package libubsan1:amd64.
#15 47.97 Preparing to unpack .../035-libubsan1_14.2.0-19_amd64.deb ...
#15 47.98 Unpacking libubsan1:amd64 (14.2.0-19) ...
#15 48.17 Selecting previously unselected package libhwasan0:amd64.
#15 48.17 Preparing to unpack .../036-libhwasan0_14.2.0-19_amd64.deb ...
#15 48.18 Unpacking libhwasan0:amd64 (14.2.0-19) ...
#15 48.41 Selecting previously unselected package libquadmath0:amd64.
#15 48.41 Preparing to unpack .../037-libquadmath0_14.2.0-19_amd64.deb ...
#15 48.42 Unpacking libquadmath0:amd64 (14.2.0-19) ...
#15 48.48 Selecting previously unselected package libgcc-14-dev:amd64.
#15 48.48 Preparing to unpack .../038-libgcc-14-dev_14.2.0-19_amd64.deb ...
#15 48.49 Unpacking libgcc-14-dev:amd64 (14.2.0-19) ...
#15 49.10 Selecting previously unselected package gcc-14-x86-64-linux-gnu.
#15 49.11 Preparing to unpack .../039-gcc-14-x86-64-linux-gnu_14.2.0-19_amd64.deb ...
#15 49.11 Unpacking gcc-14-x86-64-linux-gnu (14.2.0-19) ...
#15 53.43 Selecting previously unselected package gcc-14.
#15 53.44 Preparing to unpack .../040-gcc-14_14.2.0-19_amd64.deb ...
#15 53.44 Unpacking gcc-14 (14.2.0-19) ...
#15 53.54 Selecting previously unselected package gcc-x86-64-linux-gnu.
#15 53.54 Preparing to unpack .../041-gcc-x86-64-linux-gnu_4%3a14.2.0-1_amd64.deb ...
#15 53.55 Unpacking gcc-x86-64-linux-gnu (4:14.2.0-1) ...
#15 53.62 Selecting previously unselected package gcc.
#15 53.63 Preparing to unpack .../042-gcc_4%3a14.2.0-1_amd64.deb ...
#15 53.63 Unpacking gcc (4:14.2.0-1) ...
#15 53.69 Selecting previously unselected package libstdc++-14-dev:amd64.
#15 53.70 Preparing to unpack .../043-libstdc++-14-dev_14.2.0-19_amd64.deb ...
#15 53.70 Unpacking libstdc++-14-dev:amd64 (14.2.0-19) ...
#15 54.68 Selecting previously unselected package g++-14-x86-64-linux-gnu.
#15 54.69 Preparing to unpack .../044-g++-14-x86-64-linux-gnu_14.2.0-19_amd64.deb ...
#15 54.69 Unpacking g++-14-x86-64-linux-gnu (14.2.0-19) ...
#15 57.07 Selecting previously unselected package g++-14.
#15 57.08 Preparing to unpack .../045-g++-14_14.2.0-19_amd64.deb ...
#15 57.08 Unpacking g++-14 (14.2.0-19) ...
#15 57.13 Selecting previously unselected package g++-x86-64-linux-gnu.
#15 57.13 Preparing to unpack .../046-g++-x86-64-linux-gnu_4%3a14.2.0-1_amd64.deb ...
#15 57.14 Unpacking g++-x86-64-linux-gnu (4:14.2.0-1) ...
#15 57.20 Selecting previously unselected package g++.
#15 57.21 Preparing to unpack .../047-g++_4%3a14.2.0-1_amd64.deb ...
#15 57.*** Unpacking g++ (4:14.2.0-1) ...
#15 57.30 Selecting previously unselected package make.
#15 57.31 Preparing to unpack .../048-make_4.4.1-2_amd64.deb ...
#15 57.32 Unpacking make (4.4.1-2) ...
#15 57.42 Selecting previously unselected package libdpkg-perl.
#15 57.42 Preparing to unpack .../049-libdpkg-perl_1.***.21_all.deb ...
#15 57.43 Unpacking libdpkg-perl (1.***.21) ...
#15 57.59 Selecting previously unselected package patch.
#15 57.60 Preparing to unpack .../050-patch_2.8-2_amd64.deb ...
#15 57.60 Unpacking patch (2.8-2) ...
#15 57.67 Selecting previously unselected package dpkg-dev.
#15 57.68 Preparing to unpack .../051-dpkg-dev_1.***.21_all.deb ...
#15 57.68 Unpacking dpkg-dev (1.***.21) ...
#15 ...
#17 [frontend builder 5/7] RUN pnpm install --frozen-lockfile
#17 46.16 Progress: resolved 480, reused 0, downloaded 303, added 88
#17 47.16 Progress: resolved 480, reused 0, downloaded 373, added 114
#17 48.16 Progress: resolved 480, reused 0, downloaded 406, added 124
#17 49.29 Progress: resolved 480, reused 0, downloaded 444, added 136
#17 50.33 Progress: resolved 480, reused 0, downloaded 447, added 136
#17 51.59 Progress: resolved 480, reused 0, downloaded 447, added 137
#17 52.60 Progress: resolved 480, reused 0, downloaded 459, added 140
#17 53.60 Progress: resolved 480, reused 0, downloaded 461, added 140
#17 ...
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 57.84 Selecting previously unselected package build-essential.
#15 57.84 Preparing to unpack .../052-build-essential_12.12_amd64.deb ...
#15 57.85 Unpacking build-essential (12.12) ...
#15 57.90 Selecting previously unselected package libgpg-error0:amd64.
#15 57.90 Preparing to unpack .../053-libgpg-error0_1.51-4_amd64.deb ...
#15 57.91 Unpacking libgpg-error0:amd64 (1.51-4) ...
#15 58.00 Selecting previously unselected package libassuan9:amd64.
#15 58.01 Preparing to unpack .../054-libassuan9_3.0.2-2_amd64.deb ...
#15 58.01 Unpacking libassuan9:amd64 (3.0.2-2) ...
#15 58.08 Selecting previously unselected package libgcrypt20:amd64.
#15 58.09 Preparing to unpack .../055-libgcrypt20_1.11.0-7_amd64.deb ...
#15 58.10 Unpacking libgcrypt20:amd64 (1.11.0-7) ...
#15 58.*** Selecting previously unselected package gpgconf.
#15 58.*** Preparing to unpack .../056-gpgconf_2.4.7-21+b3_amd64.deb ...
#15 58.23 Unpacking gpgconf (2.4.7-21+b3) ...
#15 58.30 Selecting previously unselected package libunistring5:amd64.
#15 58.30 Preparing to unpack .../057-libunistring5_1.3-2_amd64.deb ...
#15 58.30 Unpacking libunistring5:amd64 (1.3-2) ...
#15 58.41 Selecting previously unselected package libidn2-0:amd64.
#15 58.42 Preparing to unpack .../058-libidn2-0_2.3.8-2_amd64.deb ...
#15 58.42 Unpacking libidn2-0:amd64 (2.3.8-2) ...
#15 58.59 Selecting previously unselected package libp11-kit0:amd64.
#15 58.60 Preparing to unpack .../059-libp11-kit0_0.25.5-3_amd64.deb ...
#15 58.60 Unpacking libp11-kit0:amd64 (0.25.5-3) ...
#15 58.74 Selecting previously unselected package libtasn1-6:amd64.
#15 58.74 Preparing to unpack .../060-libtasn1-6_4.20.0-2_amd64.deb ...
#15 58.76 Unpacking libtasn1-6:amd64 (4.20.0-2) ...
#15 58.83 Selecting previously unselected package libgnutls30t64:amd64.
#15 58.83 Preparing to unpack .../061-libgnutls30t64_3.8.9-3_amd64.deb ...
#15 58.84 Unpacking libgnutls30t64:amd64 (3.8.9-3) ...
#15 59.07 Selecting previously unselected package libksba8:amd64.
#15 59.08 Preparing to unpack .../062-libksba8_1.6.7-2+b1_amd64.deb ...
#15 59.08 Unpacking libksba8:amd64 (1.6.7-2+b1) ...
#15 59.20 Selecting previously unselected package libsasl2-modules-db:amd64.
#15 59.21 Preparing to unpack .../063-libsasl2-modules-db_2.1.28+dfsg1-9_amd64.deb ...
#15 59.21 Unpacking libsasl2-modules-db:amd64 (2.1.28+dfsg1-9) ...
#15 59.29 Selecting previously unselected package libsasl2-2:amd64.
#15 59.30 Preparing to unpack .../064-libsasl2-2_2.1.28+dfsg1-9_amd64.deb ...
#15 59.30 Unpacking libsasl2-2:amd64 (2.1.28+dfsg1-9) ...
#15 59.37 Selecting previously unselected package libldap2:amd64.
#15 59.38 Preparing to unpack .../065-libldap2_2.6.10+dfsg-1_amd64.deb ...
#15 59.38 Unpacking libldap2:amd64 (2.6.10+dfsg-1) ...
#15 59.46 Selecting previously unselected package libnpth0t64:amd64.
#15 59.47 Preparing to unpack .../066-libnpth0t64_1.8-3_amd64.deb ...
#15 59.47 Unpacking libnpth0t64:amd64 (1.8-3) ...
#15 59.53 Selecting previously unselected package dirmngr.
#15 59.54 Preparing to unpack .../067-dirmngr_2.4.7-21+b3_amd64.deb ...
#15 59.61 Unpacking dirmngr (2.4.7-21+b3) ...
#15 59.73 Selecting previously unselected package fonts-dejavu-mono.
#15 59.74 Preparing to unpack .../068-fonts-dejavu-mono_2.37-8_all.deb ...
#15 59.74 Unpacking fonts-dejavu-mono (2.37-8) ...
#15 59.91 Selecting previously unselected package fonts-dejavu-core.
#15 59.91 Preparing to unpack .../069-fonts-dejavu-core_2.37-8_all.deb ...
#15 59.95 Unpacking fonts-dejavu-core (2.37-8) ...
#15 60.25 Selecting previously unselected package fontconfig-config.
#15 60.26 Preparing to unpack .../070-fontconfig-config_2.15.0-2.3_amd64.deb ...
#15 60.26 Unpacking fontconfig-config (2.15.0-2.3) ...
#15 60.40 Selecting previously unselected package gnupg-l10n.
#15 60.41 Preparing to unpack .../071-gnupg-l10n_2.4.7-21_all.deb ...
#15 60.44 Unpacking gnupg-l10n (2.4.7-21) ...
#15 60.88 Selecting previously unselected package gpg.
#15 60.89 Preparing to unpack .../072-gpg_2.4.7-21+b3_amd64.deb ...
#15 60.90 Unpacking gpg (2.4.7-21+b3) ...
#15 61.03 Selecting previously unselected package pinentry-curses.
#15 61.04 Preparing to unpack .../073-pinentry-curses_1.3.1-2_amd64.deb ...
#15 61.04 Unpacking pinentry-curses (1.3.1-2) ...
#15 61.10 Selecting previously unselected package gpg-agent.
#15 61.10 Preparing to unpack .../074-gpg-agent_2.4.7-21+b3_amd64.deb ...
#15 61.11 Unpacking gpg-agent (2.4.7-21+b3) ...
#15 61.20 Selecting previously unselected package gpgsm.
#15 61.20 Preparing to unpack .../075-gpgsm_2.4.7-21+b3_amd64.deb ...
#15 61.20 Unpacking gpgsm (2.4.7-21+b3) ...
#15 61.33 Selecting previously unselected package gnupg.
#15 61.33 Preparing to unpack .../076-gnupg_2.4.7-21_all.deb ...
#15 61.34 Unpacking gnupg (2.4.7-21) ...
#15 61.45 Selecting previously unselected package libbrotli1:amd64.
#15 61.47 Preparing to unpack .../077-libbrotli1_1.1.0-2+b7_amd64.deb ...
#15 61.48 Unpacking libbrotli1:amd64 (1.1.0-2+b7) ...
#15 61.58 Selecting previously unselected package libpng16-16t64:amd64.
#15 61.58 Preparing to unpack .../078-libpng16-16t64_1.6.48-1_amd64.deb ...
#15 61.59 Unpacking libpng16-16t64:amd64 (1.6.48-1) ...
#15 61.65 Selecting previously unselected package libfreetype6:amd64.
#15 61.66 Preparing to unpack .../079-libfreetype6_2.13.3+dfsg-1_amd64.deb ...
#15 61.66 Unpacking libfreetype6:amd64 (2.13.3+dfsg-1) ...
#15 61.75 Selecting previously unselected package libfontconfig1:amd64.
#15 61.76 Preparing to unpack .../080-libfontconfig1_2.15.0-2.3_amd64.deb ...
#15 61.76 Unpacking libfontconfig1:amd64 (2.15.0-2.3) ...
#15 61.83 Selecting previously unselected package libpixman-1-0:amd64.
#15 61.83 Preparing to unpack .../081-libpixman-1-0_0.44.0-3_amd64.deb ...
#15 61.84 Unpacking libpixman-1-0:amd64 (0.44.0-3) ...
#15 61.91 Selecting previously unselected package libxau6:amd64.
#15 61.91 Preparing to unpack .../082-libxau6_1%3a1.0.11-1_amd64.deb ...
#15 61.95 Unpacking libxau6:amd64 (1:1.0.11-1) ...
#15 62.01 Selecting previously unselected package libxdmcp6:amd64.
#15 62.01 Preparing to unpack .../083-libxdmcp6_1%3a1.1.5-1_amd64.deb ...
#15 62.06 Unpacking libxdmcp6:amd64 (1:1.1.5-1) ...
#15 62.12 Selecting previously unselected package libxcb1:amd64.
#15 62.12 Preparing to unpack .../084-libxcb1_1.17.0-2+b1_amd64.deb ...
#15 62.13 Unpacking libxcb1:amd64 (1.17.0-2+b1) ...
#15 62.19 Selecting previously unselected package libx11-data.
#15 62.20 Preparing to unpack .../085-libx11-data_2%3a1.8.12-1_all.deb ...
#15 62.20 Unpacking libx11-data (2:1.8.12-1) ...
#15 62.47 Selecting previously unselected package libx11-6:amd64.
#15 62.49 Preparing to unpack .../086-libx11-6_2%3a1.8.12-1_amd64.deb ...
#15 62.49 Unpacking libx11-6:amd64 (2:1.8.12-1) ...
#15 62.86 Selecting previously unselected package libxcb-render0:amd64.
#15 62.86 Preparing to unpack .../087-libxcb-render0_1.17.0-2+b1_amd64.deb ...
#15 62.87 Unpacking libxcb-render0:amd64 (1.17.0-2+b1) ...
#15 63.03 Selecting previously unselected package libxcb-shm0:amd64.
#15 63.03 Preparing to unpack .../088-libxcb-shm0_1.17.0-2+b1_amd64.deb ...
#15 63.04 Unpacking libxcb-shm0:amd64 (1.17.0-2+b1) ...
#15 63.17 Selecting previously unselected package libxext6:amd64.
#15 63.18 Preparing to unpack .../089-libxext6_2%3a1.3.4-1+b3_amd64.deb ...
#15 63.20 Unpacking libxext6:amd64 (2:1.3.4-1+b3) ...
#15 63.34 Selecting previously unselected package libxrender1:amd64.
#15 63.34 Preparing to unpack .../090-libxrender1_1%3a0.9.12-1_amd64.deb ...
#15 63.35 Unpacking libxrender1:amd64 (1:0.9.12-1) ...
#15 63.50 Selecting previously unselected package libcairo2:amd64.
#15 63.51 Preparing to unpack .../091-libcairo2_1.18.4-1+b1_amd64.deb ...
#15 63.52 Unpacking libcairo2:amd64 (1.18.4-1+b1) ...
#15 63.63 Selecting previously unselected package libcom-err2:amd64.
#15 63.63 Preparing to unpack .../092-libcom-err2_1.47.2-3+b3_amd64.deb ...
#15 63.63 Unpacking libcom-err2:amd64 (1.47.2-3+b3) ...
#15 63.69 Selecting previously unselected package libkrb5support0:amd64.
#15 63.69 Preparing to unpack .../093-libkrb5support0_1.21.3-5_amd64.deb ...
#15 63.70 Unpacking libkrb5support0:amd64 (1.21.3-5) ...
#15 63.75 Selecting previously unselected package libk5crypto3:amd64.
#15 63.76 Preparing to unpack .../094-libk5crypto3_1.21.3-5_amd64.deb ...
#15 63.76 Unpacking libk5crypto3:amd64 (1.21.3-5) ...
#15 63.82 Selecting previously unselected package libkeyutils1:amd64.
#15 63.82 Preparing to unpack .../095-libkeyutils1_1.6.3-6_amd64.deb ...
#15 63.83 Unpacking libkeyutils1:amd64 (1.6.3-6) ...
#15 63.88 Selecting previously unselected package libkrb5-3:amd64.
#15 63.88 Preparing to unpack .../096-libkrb5-3_1.21.3-5_amd64.deb ...
#15 63.89 Unpacking libkrb5-3:amd64 (1.21.3-5) ...
#15 64.26 Selecting previously unselected package libgssapi-krb5-2:amd64.
#15 64.26 Preparing to unpack .../097-libgssapi-krb5-2_1.21.3-5_amd64.deb ...
#15 64.27 Unpacking libgssapi-krb5-2:amd64 (1.21.3-5) ...
#15 64.44 Selecting previously unselected package libnghttp2-14:amd64.
#15 64.44 Preparing to unpack .../098-libnghttp2-14_1.64.0-1.1_amd64.deb ...
#15 64.46 Unpacking libnghttp2-14:amd64 (1.64.0-1.1) ...
#15 64.68 Selecting previously unselected package libnghttp3-9:amd64.
#15 64.69 Preparing to unpack .../099-libnghttp3-9_1.8.0-1_amd64.deb ...
#15 64.70 Unpacking libnghttp3-9:amd64 (1.8.0-1) ...
#15 64.94 Selecting previously unselected package libngtcp2-16:amd64.
#15 64.95 Preparing to unpack .../100-libngtcp2-16_1.11.0-1_amd64.deb ...
#15 64.95 Unpacking libngtcp2-16:amd64 (1.11.0-1) ...
#15 65.15 Selecting previously unselected package libngtcp2-crypto-gnutls8:amd64.
#15 65.16 Preparing to unpack .../101-libngtcp2-crypto-gnutls8_1.11.0-1_amd64.deb ...
#15 65.18 Unpacking libngtcp2-crypto-gnutls8:amd64 (1.11.0-1) ...
#15 65.32 Selecting previously unselected package libpsl5t64:amd64.
#15 65.32 Preparing to unpack .../102-libpsl5t64_0.21.2-1.1+b1_amd64.deb ...
#15 65.33 Unpacking libpsl5t64:amd64 (0.21.2-1.1+b1) ...
#15 65.47 Selecting previously unselected package librtmp1:amd64.
#15 65.48 Preparing to unpack .../103-librtmp1_2.4+20151***3.gitfa8646d.1-2+b5_amd64.deb ...
#15 65.48 Unpacking librtmp1:amd64 (2.4+20151***3.gitfa8646d.1-2+b5) ...
#15 65.62 Selecting previously unselected package libssh2-1t64:amd64.
#15 65.63 Preparing to unpack .../104-libssh2-1t64_1.11.1-1_amd64.deb ...
#15 65.63 Unpacking libssh2-1t64:amd64 (1.11.1-1) ...
#15 65.83 Selecting previously unselected package libcurl3t64-gnutls:amd64.
#15 65.84 Preparing to unpack .../105-libcurl3t64-gnutls_8.14.1-2_amd64.deb ...
#15 65.84 Unpacking libcurl3t64-gnutls:amd64 (8.14.1-2) ...
#15 65.94 Selecting previously unselected package libdeflate0:amd64.
#15 65.94 Preparing to unpack .../106-libdeflate0_1.23-2_amd64.deb ...
#15 65.94 Unpacking libdeflate0:amd64 (1.23-2) ...
#15 66.00 Selecting previously unselected package libdrm-common.
#15 66.00 Preparing to unpack .../107-libdrm-common_2.4.124-2_all.deb ...
#15 66.01 Unpacking libdrm-common (2.4.124-2) ...
#15 66.06 Selecting previously unselected package libdrm2:amd64.
#15 66.06 Preparing to unpack .../108-libdrm2_2.4.124-2_amd64.deb ...
#15 66.07 Unpacking libdrm2:amd64 (2.4.124-2) ...
#15 66.15 Selecting previously unselected package libdrm-amdgpu1:amd64.
#15 66.16 Preparing to unpack .../109-libdrm-amdgpu1_2.4.124-2_amd64.deb ...
#15 66.16 Unpacking libdrm-amdgpu1:amd64 (2.4.124-2) ...
#15 66.*** Selecting previously unselected package libpciaccess0:amd64.
#15 66.*** Preparing to unpack .../110-libpciaccess0_0.17-3+b3_amd64.deb ...
#15 66.*** Unpacking libpciaccess0:amd64 (0.17-3+b3) ...
#15 66.29 Selecting previously unselected package libdrm-intel1:amd64.
#15 66.29 Preparing to unpack .../111-libdrm-intel1_2.4.124-2_amd64.deb ...
#15 66.30 Unpacking libdrm-intel1:amd64 (2.4.124-2) ...
#15 66.36 Selecting previously unselected package libedit2:amd64.
#15 66.36 Preparing to unpack .../112-libedit2_3.1-20250104-1_amd64.deb ...
#15 66.36 Unpacking libedit2:amd64 (3.1-20250104-1) ...
#15 66.42 Selecting previously unselected package libelf1t64:amd64.
#15 66.43 Preparing to unpack .../113-libelf1t64_0.192-4_amd64.deb ...
#15 66.43 Unpacking libelf1t64:amd64 (0.192-4) ...
#15 66.53 Selecting previously unselected package libwayland-server0:amd64.
#15 66.53 Preparing to unpack .../114-libwayland-server0_1.23.1-3_amd64.deb ...
#15 66.54 Unpacking libwayland-server0:amd64 (1.23.1-3) ...
#15 66.60 Selecting previously unselected package libxml2:amd64.
#15 66.61 Preparing to unpack .../115-libxml2_2.12.7+dfsg+really2.9.14-2.1+deb13u1_amd64.deb ...
#15 66.61 Unpacking libxml2:amd64 (2.12.7+dfsg+really2.9.14-2.1+deb13u1) ...
#15 66.77 Selecting previously unselected package libz3-4:amd64.
#15 66.77 Preparing to unpack .../116-libz3-4_4.13.3-1_amd64.deb ...
#15 66.77 Unpacking libz3-4:amd64 (4.13.3-1) ...
#15 68.79 Selecting previously unselected package libllvm19:amd64.
#15 68.80 Preparing to unpack .../117-libllvm19_1%3a19.1.7-3+b1_amd64.deb ...
#15 68.80 Unpacking libllvm19:amd64 (1:19.1.7-3+b1) ...
#15 ...
#17 [frontend builder 5/7] RUN pnpm install --frozen-lockfile
#17 59.32 Progress: resolved 480, reused 0, downloaded 462, added 140
#17 60.33 Progress: resolved 480, reused 0, downloaded 464, added 142
#17 64.35 Progress: resolved 480, reused 0, downloaded 465, added 142
#17 65.37 Progress: resolved 480, reused 0, downloaded 477, added 146
#17 66.39 Progress: resolved 480, reused 0, downloaded 479, added 146
#17 67.40 Progress: resolved 480, reused 0, downloaded 480, added 157
#17 68.40 Progress: resolved 480, reused 0, downloaded 480, added 429
#17 69.24 Progress: resolved 480, reused 0, downloaded 480, added 480, done
#17 70.56 
#17 70.56 dependencies:
#17 70.56 + @hookform/resolvers 5.2.2
#17 70.56 + @radix-ui/react-accordion 1.2.12
#17 70.56 + @radix-ui/react-alert-dialog 1.1.15
#17 70.56 + @radix-ui/react-aspect-ratio 1.1.7
#17 70.56 + @radix-ui/react-avatar 1.1.10
#17 70.56 + @radix-ui/react-checkbox 1.3.3
#17 70.56 + @radix-ui/react-collapsible 1.1.12
#17 70.56 + @radix-ui/react-context-menu 2.2.16
#17 70.56 + @radix-ui/react-dialog 1.1.15
#17 70.56 + @radix-ui/react-dropdown-menu 2.1.16
#17 70.56 + @radix-ui/react-hover-card 1.1.15
#17 70.56 + @radix-ui/react-label 2.1.7
#17 70.56 + @radix-ui/react-menubar 1.1.16
#17 70.56 + @radix-ui/react-navigation-menu 1.2.14
#17 70.56 + @radix-ui/react-popover 1.1.15
#17 70.56 + @radix-ui/react-progress 1.1.7
#17 70.56 + @radix-ui/react-radio-group 1.3.8
#17 70.56 + @radix-ui/react-scroll-area 1.2.10
#17 70.56 + @radix-ui/react-select 2.2.6
#17 70.56 + @radix-ui/react-separator 1.1.7
#17 70.56 + @radix-ui/react-slider 1.3.6
#17 70.56 + @radix-ui/react-slot 1.2.3
#17 70.56 + @radix-ui/react-switch 1.2.6
#17 70.56 + @radix-ui/react-tabs 1.1.13
#17 70.56 + @radix-ui/react-toast 1.2.15
#17 70.56 + @radix-ui/react-toggle 1.1.10
#17 70.56 + @radix-ui/react-toggle-group 1.1.11
#17 70.56 + @radix-ui/react-tooltip 1.2.8
#17 70.56 + @vercel/analytics 1.5.0
#17 70.56 + autoprefixer 10.4.21
#17 70.56 + class-variance-authority 0.7.1
#17 70.56 + clsx 2.1.1
#17 70.56 + cmdk 1.1.1
#17 70.56 + date-fns 4.1.0
#17 70.56 + embla-carousel-react 8.6.0
#17 70.56 + geist 1.5.1
#17 70.56 + input-otp 1.4.2
#17 70.56 + lucide-react 0.544.0
#17 70.56 + next 15.5.4
#17 70.56 + next-themes 0.4.6
#17 70.56 + react 19.1.1
#17 70.56 + react-day-picker 9.11.0
#17 70.56 + react-dom 19.1.1
#17 70.56 + react-hook-form 7.63.0
#17 70.56 + react-resizable-panels 3.0.6
#17 70.56 + recharts 3.2.1
#17 70.56 + sonner 2.0.7
#17 70.56 + tailwind-merge 3.3.1
#17 70.56 + tailwindcss-animate 1.0.7
#17 70.56 + vaul 1.1.2
#17 70.56 + zod 4.1.11
#17 70.56 
#17 70.56 devDependencies:
#17 70.56 + @tailwindcss/postcss 4.1.13
#17 70.56 + @testing-library/jest-dom 6.9.1
#17 70.56 + @testing-library/react 14.3.1
#17 70.56 + @testing-library/user-event 14.6.1
#17 70.56 + @types/node 24.6.0
#17 70.56 + @types/react 19.1.15
#17 70.56 + @types/react-dom 19.1.9
#17 70.56 + @vitejs/plugin-react 4.7.0
#17 70.56 + @vitest/coverage-v8 1.6.1
#17 70.56 + @vitest/ui 1.6.1
#17 70.56 + jsdom 24.1.3
#17 70.56 + postcss 8.5.6
#17 70.56 + tailwindcss 4.1.13
#17 70.56 + tw-animate-css 1.4.0
#17 70.56 + typescript 5.9.2
#17 70.56 + vite 5.4.20
#17 70.56 + vitest 1.6.1
#17 70.56 
#17 70.56 ╭ Warning ─────────────────────────────────────────────────────────────────────╮
#17 70.56 │                                                                              │
#17 70.56 │   Ignored build scripts: @tailwindcss/oxide, esbuild, sharp.                 │
#17 70.56 │   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
#17 70.56 │   to run scripts.                                                            │
#17 70.56 │                                                                              │
#17 70.56 ╰──────────────────────────────────────────────────────────────────────────────╯
#17 70.56 
#17 70.69 Done in 1m 4.6s using pnpm v10.18.3
#17 ...
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 72.66 Selecting previously unselected package libsensors-config.
#15 72.67 Preparing to unpack .../118-libsensors-config_1%3a3.6.2-2_all.deb ...
#15 72.67 Unpacking libsensors-config (1:3.6.2-2) ...
#15 72.73 Selecting previously unselected package libsensors5:amd64.
#15 72.74 Preparing to unpack .../119-libsensors5_1%3a3.6.2-2_amd64.deb ...
#15 72.77 Unpacking libsensors5:amd64 (1:3.6.2-2) ...
#15 ...
#17 [frontend builder 5/7] RUN pnpm install --frozen-lockfile
#17 DONE 71.4s
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 72.93 Selecting previously unselected package libx11-xcb1:amd64.
#15 72.93 Preparing to unpack .../120-libx11-xcb1_2%3a1.8.12-1_amd64.deb ...
#15 72.94 Unpacking libx11-xcb1:amd64 (2:1.8.12-1) ...
#15 73.09 Selecting previously unselected package libxcb-dri3-0:amd64.
#15 73.10 Preparing to unpack .../121-libxcb-dri3-0_1.17.0-2+b1_amd64.deb ...
#15 73.11 Unpacking libxcb-dri3-0:amd64 (1.17.0-2+b1) ...
#15 73.24 Selecting previously unselected package libxcb-present0:amd64.
#15 73.26 Preparing to unpack .../1***-libxcb-present0_1.17.0-2+b1_amd64.deb ...
#15 73.26 Unpacking libxcb-present0:amd64 (1.17.0-2+b1) ...
#15 73.39 Selecting previously unselected package libxcb-randr0:amd64.#15 ...
#18 [frontend builder 6/7] COPY frontend .
#18 DONE 0.6s
#15 [backend 3/8] RUN apt-get update && apt-get install -y --no-install-recommends     libgl1     libglib2.0-0     poppler-utils     build-essential     && rm -rf /var/lib/apt/lists/*
#15 73.39 Selecting previously unselected package libxcb-randr0:amd64.
#15 73.40 Preparing to unpack .../123-libxcb-randr0_1.17.0-2+b1_amd64.deb ...
#15 73.41 Unpacking libxcb-randr0:amd64 (1.17.0-2+b1) ...
#15 73.58 Selecting previously unselected package libxcb-sync1:amd64.
#15 73.61 Preparing to unpack .../124-libxcb-sync1_1.17.0-2+b1_amd64.deb ...
#15 73.62 Unpacking libxcb-sync1:amd64 (1.17.0-2+b1) ...
#15 73.82 Selecting previously unselected package libxcb-xfixes0:amd64.
#15 73.83 Preparing to unpack .../125-libxcb-xfixes0_1.17.0-2+b1_amd64.deb ...
#15 73.84 Unpacking libxcb-xfixes0:amd64 (1.17.0-2+b1) ...
#15 73.97 Selecting previously unselected package libxshmfence1:amd64.
#15 73.98 Preparing to unpack .../126-libxshmfence1_1.3.3-1_amd64.deb ...
#15 73.98 Unpacking libxshmfence1:amd64 (1.3.3-1) ...
#15 74.03 Selecting previously unselected package mesa-libgallium:amd64.
#15 74.03 Preparing to unpack .../127-mesa-libgallium_25.0.7-2_amd64.deb ...
#15 74.04 Unpacking mesa-libgallium:amd64 (25.0.7-2) ...
#15 75.37 Selecting previously unselected package libgbm1:amd64.
#15 75.38 Preparing to unpack .../128-libgbm1_25.0.7-2_amd64.deb ...
#15 75.38 Unpacking libgbm1:amd64 (25.0.7-2) ...
#15 75.44 Selecting previously unselected package libglvnd0:amd64.
#15 75.45 Preparing to unpack .../129-libglvnd0_1.7.0-1+b2_amd64.deb ...
#15 75.45 Unpacking libglvnd0:amd64 (1.7.0-1+b2) ...
#15 75.53 Selecting previously unselected package libxcb-glx0:amd64.
#15 75.53 Preparing to unpack .../130-libxcb-glx0_1.17.0-2+b1_amd64.deb ...
#15 75.54 Unpacking libxcb-glx0:amd64 (1.17.0-2+b1) ...
#15 75.59 Selecting previously unselected package libxxf86vm1:amd64.
#15 75.60 Preparing to unpack .../131-libxxf86vm1_1%3a1.1.4-1+b4_amd64.deb ...
#15 75.60 Unpacking libxxf86vm1:amd64 (1:1.1.4-1+b4) ...
#15 75.66 Selecting previously unselected package libvulkan1:amd64.
#15 75.67 Preparing to unpack .../132-libvulkan1_1.4.309.0-1_amd64.deb ...
#15 75.67 Unpacking libvulkan1:amd64 (1.4.309.0-1) ...
#15 75.75 Selecting previously unselected package libgl1-mesa-dri:amd64.
#15 75.75 Preparing to unpack .../133-libgl1-mesa-dri_25.0.7-2_amd64.deb ...
#15 75.78 Unpacking libgl1-mesa-dri:amd64 (25.0.7-2) ...
#15 75.86 Selecting previously unselected package libglx-mesa0:amd64.
#15 75.87 Preparing to unpack .../134-libglx-mesa0_25.0.7-2_amd64.deb ...
#15 75.87 Unpacking libglx-mesa0:amd64 (25.0.7-2) ...
#15 75.94 Selecting previously unselected package libglx0:amd64.
#15 75.94 Preparing to unpack .../135-libglx0_1.7.0-1+b2_amd64.deb ...
#15 75.95 Unpacking libglx0:amd64 (1.7.0-1+b2) ...
#15 76.01 Selecting previously unselected package libgl1:amd64.
#15 76.01 Preparing to unpack .../136-libgl1_1.7.0-1+b2_amd64.deb ...
#15 76.02 Unpacking libgl1:amd64 (1.7.0-1+b2) ...
#15 76.10 Selecting previously unselected package libglib2.0-0t64:amd64.
#15 76.11 Preparing to unpack .../137-libglib2.0-0t64_2.84.4-3~deb13u1_amd64.deb ...
#15 76.14 Unpacking libglib2.0-0t64:amd64 (2.84.4-3~deb13u1) ...
#15 76.37 Selecting previously unselected package libgpgme11t64:amd64.
#15 76.37 Preparing to unpack .../138-libgpgme11t64_1.24.2-3_amd64.deb ...
#15 76.38 Unpacking libgpgme11t64:amd64 (1.24.2-3) ...
#15 76.45 Selecting previously unselected package libgpgmepp6t64:amd64.
#15 76.46 Preparing to unpack .../139-libgpgmepp6t64_1.24.2-3_amd64.deb ...
#15 76.46 Unpacking libgpgmepp6t64:amd64 (1.24.2-3) ...
#15 76.53 Selecting previously unselected package libjbig0:amd64.
#15 76.54 Preparing to unpack .../140-libjbig0_2.1-6.1+b2_amd64.deb ...
#15 76.54 Unpacking libjbig0:amd64 (2.1-6.1+b2) ...
#15 76.60 Selecting previously unselected package libjpeg62-turbo:amd64.
#15 76.60 Preparing to unpack .../141-libjpeg62-turbo_1%3a2.1.5-4_amd64.deb ...
#15 76.61 Unpacking libjpeg62-turbo:amd64 (1:2.1.5-4) ...
#15 76.68 Selecting previously unselected package liblcms2-2:amd64.
#15 76.69 Preparing to unpack .../142-liblcms2-2_2.16-2_amd64.deb ...
#15 76.69 Unpacking liblcms2-2:amd64 (2.16-2) ...
#15 76.76 Selecting previously unselected package liblerc4:amd64.
#15 76.77 Preparing to unpack .../143-liblerc4_4.0.0+ds-5_amd64.deb ...
#15 76.77 Unpacking liblerc4:amd64 (4.0.0+ds-5) ...
#15 76.84 Selecting previously unselected package libnspr4:amd64.
#15 76.85 Preparing to unpack .../144-libnspr4_2%3a4.36-1_amd64.deb ...
#15 76.85 Unpacking libnspr4:amd64 (2:4.36-1) ...
#15 76.91 Selecting previously unselected package libnss3:amd64.
#15 76.92 Preparing to unpack .../145-libnss3_2%3a3.110-1_amd64.deb ...
#15 76.92 Unpacking libnss3:amd64 (2:3.110-1) ...
#15 77.11 Selecting previously unselected package libopenjp2-7:amd64.
#15 77.12 Preparing to unpack .../146-libopenjp2-7_2.5.3-2.1~deb13u1_amd64.deb ...
#15 77.12 Unpacking libopenjp2-7:amd64 (2.5.3-2.1~deb13u1) ...
#15 77.20 Selecting previously unselected package libsharpyuv0:amd64.
#15 77.20 Preparing to unpack .../147-libsharpyuv0_1.5.0-0.1_amd64.deb ...
#15 77.21 Unpacking libsharpyuv0:amd64 (1.5.0-0.1) ...
#15 77.27 Selecting previously unselected package libwebp7:amd64.
#15 77.27 Preparing to unpack .../148-libwebp7_1.5.0-0.1_amd64.deb ...
#15 77.27 Unpacking libwebp7:amd64 (1.5.0-0.1) ...
#15 77.35 Selecting previously unselected package libtiff6:amd64.
#15 77.35 Preparing to unpack .../149-libtiff6_4.7.0-3+deb13u1_amd64.deb ...
#15 77.35 Unpacking libtiff6:amd64 (4.7.0-3+deb13u1) ...
#15 77.42 Selecting previously unselected package libpoppler147:amd64.
#15 77.43 Preparing to unpack .../150-libpoppler147_25.03.0-5_amd64.deb ...
#15 77.44 Unpacking libpoppler147:amd64 (25.03.0-5) ...
#15 77.64 Selecting previously unselected package poppler-utils.
#15 77.64 Preparing to unpack .../151-poppler-utils_25.03.0-5_amd64.deb ...
#15 77.65 Unpacking poppler-utils (25.03.0-5) ...
#15 77.77 Setting up libexpat1:amd64 (2.7.1-2) ...
#15 77.78 Setting up liblcms2-2:amd64 (2.16-2) ...
#15 77.79 Setting up libpixman-1-0:amd64 (0.44.0-3) ...
#15 77.80 Setting up libsharpyuv0:amd64 (1.5.0-0.1) ...
#15 77.81 Setting up libwayland-server0:amd64 (1.23.1-3) ...
#15 77.82 Setting up libpciaccess0:amd64 (0.17-3+b3) ...
#15 77.83 Setting up libxau6:amd64 (1:1.0.11-1) ...
#15 77.84 Setting up libxdmcp6:amd64 (1:1.1.5-1) ...
#15 77.85 Setting up libnpth0t64:amd64 (1.8-3) ...
#15 77.86 Setting up libkeyutils1:amd64 (1.6.3-6) ...
#15 77.86 Setting up libxcb1:amd64 (1.17.0-2+b1) ...
#15 77.87 Setting up libxcb-xfixes0:amd64 (1.17.0-2+b1) ...
#15 77.88 Setting up liblerc4:amd64 (4.0.0+ds-5) ...
#15 77.89 Setting up libgpg-error0:amd64 (1.51-4) ...
#15 77.90 Setting up libgdbm-compat4t64:amd64 (1.24-2) ...
#15 77.90 Setting up libxcb-render0:amd64 (1.17.0-2+b1) ...
#15 77.91 Setting up libglvnd0:amd64 (1.7.0-1+b2) ...
#15 77.92 Setting up libxcb-glx0:amd64 (1.17.0-2+b1) ...
#15 77.92 Setting up libbrotli1:amd64 (1.1.0-2+b7) ...
#15 77.93 Setting up libedit2:amd64 (3.1-20250104-1) ...
#15 77.94 Setting up binutils-common:amd64 (2.44-3) ...
#15 77.95 Setting up libsensors-config (1:3.6.2-2) ...
#15 77.96 Setting up libnghttp2-14:amd64 (1.64.0-1.1) ...
#15 77.97 Setting up libdeflate0:amd64 (1.23-2) ...
#15 77.98 Setting up linux-libc-dev (6.12.48-1) ...
#15 77.99 Setting up libctf-nobfd0:amd64 (2.44-3) ...
#15 78.00 Setting up libgcrypt20:amd64 (1.11.0-7) ...
#15 78.01 Setting up libxcb-shm0:amd64 (1.17.0-2+b1) ...
#15 78.02 Setting up libcom-err2:amd64 (1.47.2-3+b3) ...
#15 78.03 Setting up libgomp1:amd64 (14.2.0-19) ...
#15 78.04 Setting up bzip2 (1.0.8-6) ...
#15 78.04 Setting up libjbig0:amd64 (2.1-6.1+b2) ...
#15 78.05 Setting up libsframe1:amd64 (2.44-3) ...
#15 78.06 Setting up libelf1t64:amd64 (0.192-4) ...
#15 78.07 Setting up libjansson4:amd64 (2.14-2+b3) ...
#15 78.08 Setting up libkrb5support0:amd64 (1.21.3-5) ...
#15 78.09 Setting up libsasl2-modules-db:amd64 (2.1.28+dfsg1-9) ...
#15 78.10 Setting up libxcb-present0:amd64 (1.17.0-2+b1) ...
#15 78.10 Setting up libz3-4:amd64 (4.13.3-1) ...
#15 78.11 Setting up rpcsvc-proto (1.4.3-1) ...
#15 78.12 Setting up libjpeg62-turbo:amd64 (1:2.1.5-4) ...
#15 78.13 Setting up libx11-data (2:1.8.12-1) ...
#15 78.14 Setting up make (4.4.1-2) ...
#15 78.14 Setting up libmpfr6:amd64 (4.2.2-1) ...
#15 78.15 Setting up libnspr4:amd64 (2:4.36-1) ...
#15 78.16 Setting up gnupg-l10n (2.4.7-21) ...
#15 78.17 Setting up libxcb-sync1:amd64 (1.17.0-2+b1) ...
#15 78.18 Setting up xz-utils (5.8.1-1) ...
#15 78.20 update-alternatives: using /usr/bin/xz to provide /usr/bin/lzma (lzma) in auto mode
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzma.1.gz because associated file /usr/share/man/man1/xz.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/unlzma.1.gz because associated file /usr/share/man/man1/unxz.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzcat.1.gz because associated file /usr/share/man/man1/xzcat.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzmore.1.gz because associated file /usr/share/man/man1/xzmore.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzless.1.gz because associated file /usr/share/man/man1/xzless.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzdiff.1.gz because associated file /usr/share/man/man1/xzdiff.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzcmp.1.gz because associated file /usr/share/man/man1/xzcmp.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzgrep.1.gz because associated file /usr/share/man/man1/xzgrep.1.gz (of link group lzma) doesn't exist
#15 78.20 update-alternatives: warning: skip creation of /usr/share/man/man1/lzegrep.1.gz because associated file /usr/share/man/man1/xzegrep.1.gz (of link group lzma) doesn't exist
#15 78.21 update-alternatives: warning: skip creation of /usr/share/man/man1/lzfgrep.1.gz because associated file /usr/share/man/man1/xzfgrep.1.gz (of link group lzma) doesn't exist
#15 78.21 Setting up libquadmath0:amd64 (14.2.0-19) ...
#15 78.*** Setting up libp11-kit0:amd64 (0.25.5-3) ...
#15 78.23 Setting up libunistring5:amd64 (1.3-2) ...
#15 78.24 Setting up fonts-dejavu-mono (2.37-8) ...
#15 78.25 Setting up libpng16-16t64:amd64 (1.6.48-1) ...
#15 78.26 Setting up libmpc3:amd64 (1.3.1-1+b3) ...
#15 78.27 Setting up libatomic1:amd64 (14.2.0-19) ...
#15 78.28 Setting up patch (2.8-2) ...
#15 78.29 Setting up fonts-dejavu-core (2.37-8) ...
#15 78.35 Setting up libsensors5:amd64 (1:3.6.2-2) ...
#15 78.36 Setting up libk5crypto3:amd64 (1.21.3-5) ...
#15 78.37 Setting up libsasl2-2:amd64 (2.1.28+dfsg1-9) ...
#15 78.38 Setting up libvulkan1:amd64 (1.4.309.0-1) ...
#15 78.39 Setting up libnghttp3-9:amd64 (1.8.0-1) ...
#15 78.39 Setting up libwebp7:amd64 (1.5.0-0.1) ...
#15 78.40 Setting up libubsan1:amd64 (14.2.0-19) ...
#15 78.41 Setting up perl-modules-5.40 (5.40.1-6) ...
#15 78.42 Setting up libxshmfence1:amd64 (1.3.3-1) ...
#15 78.43 Setting up libhwasan0:amd64 (14.2.0-19) ...
#15 78.43 Setting up libcrypt-dev:amd64 (1:4.4.38-1) ...
#15 78.46 Setting up libtiff6:amd64 (4.7.0-3+deb13u1) ...
#15 78.46 Setting up libxcb-randr0:amd64 (1.17.0-2+b1) ...
#15 78.47 Setting up libasan8:amd64 (14.2.0-19) ...
#15 78.48 Setting up libassuan9:amd64 (3.0.2-2) ...
#15 78.49 Setting up gpgconf (2.4.7-21+b3) ...
#15 78.50 Setting up libtasn1-6:amd64 (4.20.0-2) ...
#15 78.50 Setting up libopenjp2-7:amd64 (2.5.3-2.1~deb13u1) ...
#15 78.53 Setting up libx11-6:amd64 (2:1.8.12-1) ...
#15 78.55 Setting up libngtcp2-16:amd64 (1.11.0-1) ...
#15 78.56 Setting up libkrb5-3:amd64 (1.21.3-5) ...
#15 78.57 Setting up libssh2-1t64:amd64 (1.11.1-1) ...
#15 78.60 Setting up libtsan2:amd64 (14.2.0-19) ...
#15 78.61 Setting up libbinutils:amd64 (2.44-3) ...
#15 78.62 Setting up libisl23:amd64 (0.27-1) ...
#15 78.62 Setting up libc-dev-bin (2.41-12) ...
#15 78.63 Setting up libdrm-common (2.4.124-2) ...
#15 78.64 Setting up libxml2:amd64 (2.12.7+dfsg+really2.9.14-2.1+deb13u1) ...
#15 78.65 Setting up libcc1-0:amd64 (14.2.0-19) ...
#15 78.65 Setting up libldap2:amd64 (2.6.10+dfsg-1) ...
#15 78.66 Setting up liblsan0:amd64 (14.2.0-19) ...
#15 78.67 Setting up libitm1:amd64 (14.2.0-19) ...
#15 78.68 Setting up libctf0:amd64 (2.44-3) ...
#15 78.69 Setting up libksba8:amd64 (1.6.7-2+b1) ...
#15 78.70 Setting up pinentry-curses (1.3.1-2) ...
#15 78.71 Setting up libxcb-dri3-0:amd64 (1.17.0-2+b1) ...
#15 78.72 Setting up libllvm19:amd64 (1:19.1.7-3+b1) ...
#15 78.73 Setting up libx11-xcb1:amd64 (2:1.8.12-1) ...
#15 78.74 Setting up gpg-agent (2.4.7-21+b3) ...
#15 79.76 Setting up libxrender1:amd64 (1:0.9.12-1) ...
#15 79.77 Setting up fontconfig-config (2.15.0-2.3) ...
#15 79.98 debconf: unable to initialize frontend: Dialog
#15 79.98 debconf: (TERM is not set, so the dialog frontend is not usable.)
#15 79.98 debconf: falling back to frontend: Readline
#15 80.00 debconf: unable to initialize frontend: Readline
#15 80.00 debconf: (This frontend requires a controlling tty.)
#15 80.00 debconf: falling back to frontend: Teletype
#15 80.01 debconf: unable to initialize frontend: Teletype
#15 80.01 debconf: (This frontend requires a controlling tty.)
#15 80.02 debconf: falling back to frontend: Noninteractive
#15 80.11 Setting up gpgsm (2.4.7-21+b3) ...
#15 80.12 Setting up libxext6:amd64 (2:1.3.4-1+b3) ...
#15 80.13 Setting up libidn2-0:amd64 (2.3.8-2) ...
#15 80.14 Setting up libnss3:amd64 (2:3.110-1) ...
#15 80.14 Setting up libxxf86vm1:amd64 (1:1.1.4-1+b4) ...
#15 80.15 Setting up libperl5.40:amd64 (5.40.1-6) ...
#15 80.16 Setting up perl (5.40.1-6) ...
#15 80.18 Setting up libglib2.0-0t64:amd64 (2.84.4-3~deb13u1) ...
#15 80.20 No schema files found: doing nothing.
#15 80.21 Setting up libgprofng0:amd64 (2.44-3) ...
#15 80.*** Setting up libfreetype6:amd64 (2.13.3+dfsg-1) ...
#15 80.23 Setting up libgssapi-krb5-2:amd64 (1.21.3-5) ...
#15 80.24 Setting up cpp-14-x86-64-linux-gnu (14.2.0-19) ...
#15 80.25 Setting up libdpkg-perl (1.***.21) ...
#15 80.25 Setting up cpp-14 (14.2.0-19) ...
#15 80.26 Setting up libdrm2:amd64 (2.4.124-2) ...
#15 80.27 Setting up libc6-dev:amd64 (2.41-12) ...
#15 80.28 Setting up libfontconfig1:amd64 (2.15.0-2.3) ...
#15 80.29 Setting up libgcc-14-dev:amd64 (14.2.0-19) ...
#15 80.29 Setting up libstdc++-14-dev:amd64 (14.2.0-19) ...
#15 80.30 Setting up gpg (2.4.7-21+b3) ...
#15 80.55 Setting up binutils-x86-64-linux-gnu (2.44-3) ...
#15 80.56 Setting up libdrm-amdgpu1:amd64 (2.4.124-2) ...
#15 80.56 Setting up cpp-x86-64-linux-gnu (4:14.2.0-1) ...
#15 80.57 Setting up libgnutls30t64:amd64 (3.8.9-3) ...
#15 80.58 Setting up libdrm-intel1:amd64 (2.4.124-2) ...
#15 80.59 Setting up libpsl5t64:amd64 (0.21.2-1.1+b1) ...
#15 80.59 Setting up binutils (2.44-3) ...
#15 80.61 Setting up libcairo2:amd64 (1.18.4-1+b1) ...
#15 80.62 Setting up dpkg-dev (1.***.21) ...
#15 80.63 Setting up dirmngr (2.4.7-21+b3) ...
#15 80.92 Setting up librtmp1:amd64 (2.4+20151***3.gitfa8646d.1-2+b5) ...
#15 80.93 Setting up cpp (4:14.2.0-1) ...
#15 80.96 Setting up gnupg (2.4.7-21) ...
#15 80.96 Setting up libgpgme11t64:amd64 (1.24.2-3) ...
#15 80.97 Setting up gcc-14-x86-64-linux-gnu (14.2.0-19) ...
#15 80.98 Setting up libngtcp2-crypto-gnutls8:amd64 (1.11.0-1) ...
#15 80.99 Setting up libgpgmepp6t64:amd64 (1.24.2-3) ...
#15 80.99 Setting up mesa-libgallium:amd64 (25.0.7-2) ...
#15 81.00 Setting up gcc-x86-64-linux-gnu (4:14.2.0-1) ...
#15 81.01 Setting up libgbm1:amd64 (25.0.7-2) ...
#15 81.02 Setting up libgl1-mesa-dri:amd64 (25.0.7-2) ...
#15 81.04 Setting up libcurl3t64-gnutls:amd64 (8.14.1-2) ...
#15 81.05 Setting up gcc-14 (14.2.0-19) ...
#15 81.05 Setting up g++-14-x86-64-linux-gnu (14.2.0-19) ...
#15 81.06 Setting up g++-x86-64-linux-gnu (4:14.2.0-1) ...
#15 81.07 Setting up g++-14 (14.2.0-19) ...
#15 81.08 Setting up libglx-mesa0:amd64 (25.0.7-2) ...
#15 81.09 Setting up libpoppler147:amd64 (25.03.0-5) ...
#15 81.10 Setting up libglx0:amd64 (1.7.0-1+b2) ...
#15 81.10 Setting up gcc (4:14.2.0-1) ...
#15 81.13 Setting up libgl1:amd64 (1.7.0-1+b2) ...
#15 81.14 Setting up g++ (4:14.2.0-1) ...
#15 81.16 update-alternatives: using /usr/bin/g++ to provide /usr/bin/c++ (c++) in auto mode
#15 81.16 Setting up build-essential (12.12) ...
#15 81.17 Setting up poppler-utils (25.03.0-5) ...
#15 81.18 Processing triggers for libc-bin (2.41-12) ...
#15 DONE 81.8s
#19 [frontend builder 7/7] RUN pnpm build
#19 1.831 
#19 1.831 > my-v0-project@0.1.0 build /app/frontend
#19 1.831 > next build
#19 1.831 
#19 3.923 Attention: Next.js now collects completely anonymous telemetry regarding usage.
#19 3.925 This information is used to shape Next.js' roadmap and prioritize features.
#19 3.926 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
#19 3.927 https://nextjs.org/telemetry
#19 3.927 
#19 4.142    ▲ Next.js 15.5.4
#19 4.144 
#19 4.385    Creating an optimized production build ...
#19 ...
#20 [backend 4/8] COPY backend/requirements.txt ./backend/requirements.txt
#20 DONE 0.0s
#21 [backend 5/8] RUN pip install --upgrade pip && pip install -r backend/requirements.txt
#21 3.590 Requirement already satisfied: pip in /usr/local/lib/python3.11/site-packages (24.0)
#21 3.734 Collecting pip
#21 3.936   Downloading pip-25.2-py3-none-any.whl.metadata (4.7 kB)
#21 3.949 Downloading pip-25.2-py3-none-any.whl (1.8 MB)
#21 3.986    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.8/1.8 MB 59.3 MB/s eta 0:00:00
#21 4.086 Installing collected packages: pip
#21 4.087   Attempting uninstall: pip
#21 4.093     Found existing installation: pip 24.0
#21 4.203     Uninstalling pip-24.0:
#21 4.621       Successfully uninstalled pip-24.0
#21 6.767 Successfully installed pip-25.2
#21 6.769 WARNING: Running pip as the '***' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
#21 8.895 Collecting agate==1.12.0 (from -r backend/requirements.txt (line 1))
#21 8.935   Downloading agate-1.12.0-py2.py3-none-any.whl.metadata (3.2 kB)
#21 9.067 Collecting agate-dbf==0.2.3 (from -r backend/requirements.txt (line 2))
#21 9.077   Downloading agate_dbf-0.2.3-py2.py3-none-any.whl.metadata (2.5 kB)
#21 9.210 Collecting agate-excel==0.4.1 (from -r backend/requirements.txt (line 3))
#21 9.216   Downloading agate_excel-0.4.1-py2.py3-none-any.whl.metadata (2.7 kB)
#21 9.350 Collecting agate-sql==0.7.2 (from -r backend/requirements.txt (line 4))
#21 9.360   Downloading agate_sql-0.7.2-py2.py3-none-any.whl.metadata (2.6 kB)
#21 9.415 Collecting alembic==1.14.1 (from -r backend/requirements.txt (line 5))
#21 9.425   Downloading alembic-1.14.1-py3-none-any.whl.metadata (7.4 kB)
#21 9.494 Collecting APScheduler==3.11.0 (from -r backend/requirements.txt (line 6))
#21 9.502   Downloading APScheduler-3.11.0-py3-none-any.whl.metadata (6.4 kB)
#21 9.532 Collecting babel==2.16.0 (from -r backend/requirements.txt (line 7))
#21 9.538   Downloading babel-2.16.0-py3-none-any.whl.metadata (1.5 kB)
#21 9.555 Collecting blinker==1.8.2 (from -r backend/requirements.txt (line 8))
#21 9.563   Downloading blinker-1.8.2-py3-none-any.whl.metadata (1.6 kB)
#21 9.592 Collecting certifi==2024.12.14 (from -r backend/requirements.txt (line 9))
#21 9.602   Downloading certifi-2024.12.14-py3-none-any.whl.metadata (2.3 kB)
#21 9.751 Collecting charset-normalizer==3.4.1 (from -r backend/requirements.txt (line 10))
#21 9.757   Downloading charset_normalizer-3.4.1-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (35 kB)
#21 9.787 Collecting click==8.1.7 (from -r backend/requirements.txt (line 11))
#21 9.794   Downloading click-8.1.7-py3-none-any.whl.metadata (3.0 kB)
#21 9.818 Collecting colorama==0.4.6 (from -r backend/requirements.txt (line 12))
#21 9.828   Downloading colorama-0.4.6-py2.py3-none-any.whl.metadata (17 kB)
#21 9.980 Collecting contourpy==1.3.1 (from -r backend/requirements.txt (line 13))
#21 9.988   Downloading contourpy-1.3.1-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (5.4 kB)
#21 10.13 Collecting csvkit==2.0.1 (from -r backend/requirements.txt (line 14))
#21 10.14   Downloading csvkit-2.0.1-py2.py3-none-any.whl.metadata (3.2 kB)
#21 10.15 Collecting cycler==0.12.1 (from -r backend/requirements.txt (line 15))
#21 10.16   Downloading cycler-0.12.1-py3-none-any.whl.metadata (3.8 kB)
#21 10.18 Collecting dbfread==2.0.7 (from -r backend/requirements.txt (line 16))
#21 10.18   Downloading dbfread-2.0.7-py2.py3-none-any.whl.metadata (3.3 kB)
#21 10.19 Collecting et_xmlfile==2.0.0 (from -r backend/requirements.txt (line 17))
#21 10.20   Downloading et_xmlfile-2.0.0-py3-none-any.whl.metadata (2.7 kB)
#21 10.23 Collecting Flask==3.0.3 (from -r backend/requirements.txt (line 18))
#21 10.24   Downloading flask-3.0.3-py3-none-any.whl.metadata (3.2 kB)
#21 10.27 Collecting flask-cors==6.0.0 (from -r backend/requirements.txt (line 19))
#21 10.28   Downloading flask_cors-6.0.0-py3-none-any.whl.metadata (961 bytes)
#21 10.30 Collecting Flask-JWT-Extended==4.6.0 (from -r backend/requirements.txt (line 20))
#21 10.31   Downloading Flask_JWT_Extended-4.6.0-py2.py3-none-any.whl.metadata (3.9 kB)
#21 10.34 Collecting Flask-Migrate==4.1.0 (from -r backend/requirements.txt (line 21))
#21 10.34   Downloading Flask_Migrate-4.1.0-py3-none-any.whl.metadata (3.3 kB)
#21 10.36 Collecting Flask-SQLAlchemy==3.1.1 (from -r backend/requirements.txt (line ***))
#21 10.37   Downloading flask_sqlalchemy-3.1.1-py3-none-any.whl.metadata (3.4 kB)
#21 10.40 Collecting Flask-Limiter==3.7.0 (from -r backend/requirements.txt (line 23))
#21 10.41   Downloading Flask_Limiter-3.7.0-py3-none-any.whl.metadata (6.1 kB)
#21 10.44 Collecting Flask-Compress==1.14.0 (from -r backend/requirements.txt (line 24))
#21 10.44   Downloading Flask_Compress-1.14-py3-none-any.whl.metadata (7.8 kB)
#21 10.70 Collecting fonttools==4.54.1 (from -r backend/requirements.txt (line 25))
#21 10.71   Downloading fonttools-4.54.1-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (163 kB)
#21 11.07 Collecting greenlet==3.1.1 (from -r backend/requirements.txt (line 26))
#21 11.08   Downloading greenlet-3.1.1-cp311-cp311-manylinux_2_24_x86_64.manylinux_2_28_x86_64.whl.metadata (3.8 kB)
#21 11.12 Collecting gunicorn==23.0.0 (from -r backend/requirements.txt (line 27))
#21 11.12   Downloading gunicorn-23.0.0-py3-none-any.whl.metadata (4.4 kB)
#21 11.14 Collecting idna==3.10 (from -r backend/requirements.txt (line 28))
#21 11.15   Downloading idna-3.10-py3-none-any.whl.metadata (10 kB)
#21 11.17 Collecting iniconfig==2.1.0 (from -r backend/requirements.txt (line 29))
#21 11.17   Downloading iniconfig-2.1.0-py3-none-any.whl.metadata (2.7 kB)
#21 11.19 Collecting isodate==0.7.2 (from -r backend/requirements.txt (line 30))
#21 11.20   Downloading isodate-0.7.2-py3-none-any.whl.metadata (11 kB)
#21 11.*** Collecting itsdangerous==2.2.0 (from -r backend/requirements.txt (line 31))
#21 11.23   Downloading itsdangerous-2.2.0-py3-none-any.whl.metadata (1.9 kB)
#21 11.25 Collecting Jinja2==3.1.4 (from -r backend/requirements.txt (line 32))
#21 11.26   Downloading jinja2-3.1.4-py3-none-any.whl.metadata (2.6 kB)
#21 11.28 Collecting json5==0.9.28 (from -r backend/requirements.txt (line 33))
#21 11.29   Downloading json5-0.9.28-py3-none-any.whl.metadata (32 kB)
#21 11.41 Collecting kiwisolver==1.4.7 (from -r backend/requirements.txt (line 34))
#21 11.43   Downloading kiwisolver-1.4.7-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (6.3 kB)
#21 11.45 Collecting leather==0.4.0 (from -r backend/requirements.txt (line 35))
#21 11.46   Downloading leather-0.4.0-py2.py3-none-any.whl.metadata (2.8 kB)
#21 11.49 Collecting Mako==1.3.9 (from -r backend/requirements.txt (line 36))
#21 11.50   Downloading Mako-1.3.9-py3-none-any.whl.metadata (2.9 kB)
#21 11.61 Collecting MarkupSafe==3.0.2 (from -r backend/requirements.txt (line 37))
#21 11.62   Downloading MarkupSafe-3.0.2-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.0 kB)
#21 11.85 Collecting matplotlib==3.9.2 (from -r backend/requirements.txt (line 38))
#21 11.86   Downloading matplotlib-3.9.2-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (11 kB)
#21 11.95 Collecting mysql-connector-python==9.0.0 (from -r backend/requirements.txt (line 39))
#21 11.96   Downloading mysql_connector_python-9.0.0-cp311-cp311-manylinux_2_17_x86_64.whl.metadata (2.0 kB)
#21 12.41 Collecting numpy==2.1.3 (from -r backend/requirements.txt (line 40))
#21 12.44   Downloading numpy-2.1.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (62 kB)
#21 12.47 Collecting olefile==0.47 (from -r backend/requirements.txt (line 41))
#21 12.48   Downloading olefile-0.47-py2.py3-none-any.whl.metadata (9.7 kB)
#21 12.63 Collecting opencv-python==4.10.0.84 (from -r backend/requirements.txt (line 42))
#21 12.64   Downloading opencv_python-4.10.0.84-cp37-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (20 kB)
#21 12.68 Collecting openpyxl==3.1.5 (from -r backend/requirements.txt (line 43))
#21 12.69   Downloading openpyxl-3.1.5-py2.py3-none-any.whl.metadata (2.5 kB)
#21 12.71 Collecting packaging==24.2 (from -r backend/requirements.txt (line 44))
#21 12.72   Downloading packaging-24.2-py3-none-any.whl.metadata (3.2 kB)
#21 12.94 Collecting pandas==2.2.3 (from -r backend/requirements.txt (line 45))
#21 12.95   Downloading pandas-2.2.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (89 kB)
#21 13.02 Collecting parsedatetime==2.6 (from -r backend/requirements.txt (line 46))
#21 13.03   Downloading parsedatetime-2.6-py3-none-any.whl.metadata (4.7 kB)
#21 13.05 Collecting pdf2image==1.17.0 (from -r backend/requirements.txt (line 47))
#21 13.06   Downloading pdf2image-1.17.0-py3-none-any.whl.metadata (6.2 kB)
#21 13.53 Collecting pillow==11.0.0 (from -r backend/requirements.txt (line 48))
#21 13.54   Downloading pillow-11.0.0-cp311-cp311-manylinux_2_28_x86_64.whl.metadata (9.1 kB)
#21 13.57 Collecting pluggy==1.6.0 (from -r backend/requirements.txt (line 49))
#21 13.58   Downloading pluggy-1.6.0-py3-none-any.whl.metadata (4.8 kB)
#21 13.68 Collecting psycopg2-binary==2.9.10 (from -r backend/requirements.txt (line 50))
#21 13.70   Downloading psycopg2_binary-2.9.10-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.9 kB)
#21 13.73 Collecting PyJWT==2.9.0 (from -r backend/requirements.txt (line 51))
#21 13.82   Downloading PyJWT-2.9.0-py3-none-any.whl.metadata (3.0 kB)
#21 13.87 Collecting pyparsing==3.2.0 (from -r backend/requirements.txt (line 52))
#21 13.87   Downloading pyparsing-3.2.0-py3-none-any.whl.metadata (5.0 kB)
#21 13.89 Collecting pytesseract==0.3.13 (from -r backend/requirements.txt (line 53))
#21 13.90   Downloading pytesseract-0.3.13-py3-none-any.whl.metadata (11 kB)
#21 13.97 Collecting pytest==8.3.5 (from -r backend/requirements.txt (line 54))
#21 13.98   Downloading pytest-8.3.5-py3-none-any.whl.metadata (7.6 kB)
#21 14.03 Collecting python-dateutil==2.9.0.post0 (from -r backend/requirements.txt (line 55))
#21 14.03   Downloading python_dateutil-2.9.0.post0-py2.py3-none-any.whl.metadata (8.4 kB)
#21 14.12 Collecting python-dotenv==1.0.1 (from -r backend/requirements.txt (line 56))
#21 14.13   Downloading python_dotenv-1.0.1-py3-none-any.whl.metadata (23 kB)
#21 14.15 Collecting python-slugify==8.0.4 (from -r backend/requirements.txt (line 57))
#21 14.18   Downloading python_slugify-8.0.4-py2.py3-none-any.whl.metadata (8.5 kB)
#21 14.20 Collecting pytimeparse==1.1.8 (from -r backend/requirements.txt (line 58))
#21 14.21   Downloading pytimeparse-1.1.8-py2.py3-none-any.whl.metadata (3.4 kB)
#21 14.27 Collecting pytz==2025.2 (from -r backend/requirements.txt (line 59))
#21 14.28   Downloading pytz-2025.2-py2.py3-none-any.whl.metadata (*** kB)
#21 14.33 Collecting redis==5.2.0 (from -r backend/requirements.txt (line 60))
#21 14.34   Downloading redis-5.2.0-py3-none-any.whl.metadata (9.1 kB)
#21 14.40 Collecting requests==2.32.3 (from -r backend/requirements.txt (line 61))
#21 14.40   Downloading requests-2.32.3-py3-none-any.whl.metadata (4.6 kB)
#21 14.42 Collecting six==1.16.0 (from -r backend/requirements.txt (line 62))
#21 14.43   Downloading six-1.16.0-py2.py3-none-any.whl.metadata (1.8 kB)
#21 15.18 Collecting SQLAlchemy==2.0.36 (from -r backend/requirements.txt (line 63))
#21 15.19   Downloading SQLAlchemy-2.0.36-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (9.7 kB)
#21 15.*** Collecting text-unidecode==1.3 (from -r backend/requirements.txt (line 64))
#21 15.23   Downloading text_unidecode-1.3-py2.py3-none-any.whl.metadata (2.4 kB)
#21 15.37 Collecting types-Flask-Cors==5.0.0.20240902 (from -r backend/requirements.txt (line 65))
#21 15.38   Downloading types_Flask_Cors-5.0.0.20240902-py3-none-any.whl.metadata (1.9 kB)
#21 15.41 Collecting types-psycopg2==2.9.21.20241019 (from -r backend/requirements.txt (line 66))
#21 15.42   Downloading types_psycopg2-2.9.21.20241019-py3-none-any.whl.metadata (1.7 kB)
#21 15.48 Collecting types-requests==2.32.0.20241016 (from -r backend/requirements.txt (line 67))
#21 15.49   Downloading types_requests-2.32.0.20241016-py3-none-any.whl.metadata (1.9 kB)
#21 15.52 Collecting typing_extensions==4.12.2 (from -r backend/requirements.txt (line 68))
#21 15.53   Downloading typing_extensions-4.12.2-py3-none-any.whl.metadata (3.0 kB)
#21 15.55 Collecting tzdata==2024.2 (from -r backend/requirements.txt (line 69))
#21 15.56   Downloading tzdata-2024.2-py2.py3-none-any.whl.metadata (1.4 kB)
#21 15.58 Collecting tzlocal==5.3.1 (from -r backend/requirements.txt (line 70))
#21 15.59   Downloading tzlocal-5.3.1-py3-none-any.whl.metadata (7.6 kB)
#21 15.63 Collecting urllib3==2.3.0 (from -r backend/requirements.txt (line 71))
#21 15.64   Downloading urllib3-2.3.0-py3-none-any.whl.metadata (6.5 kB)
#21 15.69 Collecting Werkzeug==3.0.6 (from -r backend/requirements.txt (line 72))
#21 15.70   Downloading werkzeug-3.0.6-py3-none-any.whl.metadata (3.7 kB)
#21 15.83 Collecting flask-marshmallow==1.2.1 (from -r backend/requirements.txt (line 73))
#21 15.84   Downloading flask_marshmallow-1.2.1-py3-none-any.whl.metadata (5.2 kB)
#21 15.87 Collecting marshmallow-sqlalchemy==1.1.0 (from -r backend/requirements.txt (line 74))
#21 15.89   Downloading marshmallow_sqlalchemy-1.1.0-py3-none-any.whl.metadata (6.3 kB)
#21 15.91 Collecting xlrd==2.0.1 (from -r backend/requirements.txt (line 75))
#21 15.92   Downloading xlrd-2.0.1-py2.py3-none-any.whl.metadata (3.4 kB)
#21 15.98 Collecting marshmallow==3.21.1 (from -r backend/requirements.txt (line 79))
#21 15.99   Downloading marshmallow-3.21.1-py3-none-any.whl.metadata (7.2 kB)
#21 16.41 Collecting limits>=2.8 (from Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 16.42   Downloading limits-5.6.0-py3-none-any.whl.metadata (10 kB)
#21 16.45 Collecting ordered-set<5,>4 (from Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 16.46   Downloading ordered_set-4.1.0-py3-none-any.whl.metadata (5.3 kB)
#21 16.54 Collecting rich<14,>=12 (from Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 16.55   Downloading rich-13.9.4-py3-none-any.whl.metadata (18 kB)
#21 16.61 Collecting brotli (from Flask-Compress==1.14.0->-r backend/requirements.txt (line 24))
#21 16.62   Downloading Brotli-1.1.0-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (5.5 kB)
#21 17.25 Collecting markdown-it-py>=2.2.0 (from rich<14,>=12->Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 17.25   Downloading markdown_it_py-4.0.0-py3-none-any.whl.metadata (7.3 kB)
#21 17.30 Collecting pygments<3.0.0,>=2.13.0 (from rich<14,>=12->Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 17.31   Downloading pygments-2.19.2-py3-none-any.whl.metadata (2.5 kB)
#21 17.35 Collecting deprecated>=1.2 (from limits>=2.8->Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 17.36   Downloading Deprecated-1.2.18-py2.py3-none-any.whl.metadata (5.7 kB)
#21 17.61 Collecting wrapt<2,>=1.10 (from deprecated>=1.2->limits>=2.8->Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 17.62   Downloading wrapt-1.17.3-cp311-cp311-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl.metadata (6.4 kB)
#21 17.65 Collecting mdurl~=0.1 (from markdown-it-py>=2.2.0->rich<14,>=12->Flask-Limiter==3.7.0->-r backend/requirements.txt (line 23))
#21 17.66   Downloading mdurl-0.1.2-py3-none-any.whl.metadata (1.6 kB)
#21 17.81 Downloading agate-1.12.0-py2.py3-none-any.whl (95 kB)
#21 17.82 Downloading agate_dbf-0.2.3-py2.py3-none-any.whl (3.6 kB)
#21 17.83 Downloading agate_excel-0.4.1-py2.py3-none-any.whl (7.1 kB)
#21 17.84 Downloading agate_sql-0.7.2-py2.py3-none-any.whl (7.3 kB)
#21 17.85 Downloading alembic-1.14.1-py3-none-any.whl (233 kB)
#21 17.86 Downloading APScheduler-3.11.0-py3-none-any.whl (64 kB)
#21 17.87 Downloading babel-2.16.0-py3-none-any.whl (9.6 MB)
#21 18.00    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 9.6/9.6 MB 79.9 MB/s  0:00:00
#21 18.02 Downloading blinker-1.8.2-py3-none-any.whl (9.5 kB)
#21 18.03 Downloading certifi-2024.12.14-py3-none-any.whl (164 kB)
#21 18.04 Downloading charset_normalizer-3.4.1-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (143 kB)
#21 18.05 Downloading click-8.1.7-py3-none-any.whl (97 kB)
#21 18.06 Downloading colorama-0.4.6-py2.py3-none-any.whl (25 kB)
#21 18.07 Downloading contourpy-1.3.1-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (326 kB)
#21 18.21 Downloading csvkit-2.0.1-py2.py3-none-any.whl (74 kB)
#21 18.*** Downloading cycler-0.12.1-py3-none-any.whl (8.3 kB)
#21 18.23 Downloading dbfread-2.0.7-py2.py3-none-any.whl (20 kB)
#21 18.23 Downloading et_xmlfile-2.0.0-py3-none-any.whl (18 kB)
#21 18.24 Downloading flask-3.0.3-py3-none-any.whl (101 kB)
#21 18.25 Downloading flask_cors-6.0.0-py3-none-any.whl (11 kB)
#21 18.26 Downloading Flask_JWT_Extended-4.6.0-py2.py3-none-any.whl (*** kB)
#21 18.28 Downloading PyJWT-2.9.0-py3-none-any.whl (*** kB)
#21 18.29 Downloading Flask_Migrate-4.1.0-py3-none-any.whl (21 kB)
#21 18.30 Downloading flask_sqlalchemy-3.1.1-py3-none-any.whl (25 kB)
#21 18.30 Downloading Flask_Limiter-3.7.0-py3-none-any.whl (28 kB)
#21 18.31 Downloading Flask_Compress-1.14-py3-none-any.whl (8.4 kB)
#21 18.34 Downloading fonttools-4.54.1-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (4.9 MB)
#21 18.39    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.9/4.9 MB 103.1 MB/s  0:00:00
#21 18.40 Downloading greenlet-3.1.1-cp311-cp311-manylinux_2_24_x86_64.manylinux_2_28_x86_64.whl (602 kB)
#21 18.41    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 602.4/602.4 kB 297.2 MB/s  0:00:00
#21 18.42 Downloading gunicorn-23.0.0-py3-none-any.whl (85 kB)
#21 18.43 Downloading idna-3.10-py3-none-any.whl (70 kB)
#21 18.44 Downloading iniconfig-2.1.0-py3-none-any.whl (6.0 kB)
#21 18.45 Downloading isodate-0.7.2-py3-none-any.whl (*** kB)
#21 18.46 Downloading itsdangerous-2.2.0-py3-none-any.whl (16 kB)
#21 18.47 Downloading jinja2-3.1.4-py3-none-any.whl (133 kB)
#21 18.48 Downloading json5-0.9.28-py3-none-any.whl (30 kB)
#21 18.49 Downloading kiwisolver-1.4.7-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (1.4 MB)
#21 18.52    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.4/1.4 MB 143.4 MB/s  0:00:00
#21 18.53 Downloading leather-0.4.0-py2.py3-none-any.whl (30 kB)
#21 18.54 Downloading Mako-1.3.9-py3-none-any.whl (78 kB)
#21 18.55 Downloading MarkupSafe-3.0.2-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (23 kB)
#21 18.56 Downloading matplotlib-3.9.2-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (8.3 MB)
#21 18.70    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.3/8.3 MB 65.7 MB/s  0:00:00
#21 18.72 Downloading mysql_connector_python-9.0.0-cp311-cp311-manylinux_2_17_x86_64.whl (19.3 MB)
#21 18.95    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 19.3/19.3 MB 90.5 MB/s  0:00:00
#21 18.96 Downloading numpy-2.1.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (16.3 MB)
#21 19.14    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 16.3/16.3 MB 93.1 MB/s  0:00:00
#21 19.15 Downloading olefile-0.47-py2.py3-none-any.whl (114 kB)
#21 19.16 Downloading opencv_python-4.10.0.84-cp37-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (62.5 MB)
#21 20.03    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62.5/62.5 MB 73.0 MB/s  0:00:00
#21 20.04 Downloading openpyxl-3.1.5-py2.py3-none-any.whl (250 kB)
#21 20.04 Downloading packaging-24.2-py3-none-any.whl (65 kB)
#21 20.06 Downloading pandas-2.2.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (13.1 MB)
#21 20.24    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 13.1/13.1 MB 72.7 MB/s  0:00:00
#21 20.25 Downloading parsedatetime-2.6-py3-none-any.whl (42 kB)
#21 20.27 Downloading pdf2image-1.17.0-py3-none-any.whl (11 kB)
#21 20.28 Downloading pillow-11.0.0-cp311-cp311-manylinux_2_28_x86_64.whl (4.4 MB)
#21 20.34    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.4/4.4 MB 94.0 MB/s  0:00:00
#21 20.35 Downloading pluggy-1.6.0-py3-none-any.whl (20 kB)
#21 20.39 Downloading psycopg2_binary-2.9.10-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (3.0 MB)
#21 20.45    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.0/3.0 MB 63.5 MB/s  0:00:00
#21 20.46 Downloading pyparsing-3.2.0-py3-none-any.whl (106 kB)
#21 20.47 Downloading pytesseract-0.3.13-py3-none-any.whl (14 kB)
#21 20.48 Downloading pytest-8.3.5-py3-none-any.whl (343 kB)
#21 20.49 Downloading python_dateutil-2.9.0.post0-py2.py3-none-any.whl (***9 kB)
#21 20.50 Downloading python_dotenv-1.0.1-py3-none-any.whl (19 kB)
#21 20.51 Downloading python_slugify-8.0.4-py2.py3-none-any.whl (10 kB)
#21 20.52 Downloading pytimeparse-1.1.8-py2.py3-none-any.whl (10.0 kB)
#21 20.53 Downloading pytz-2025.2-py2.py3-none-any.whl (509 kB)
#21 20.54 Downloading redis-5.2.0-py3-none-any.whl (261 kB)
#21 20.55 Downloading requests-2.32.3-py3-none-any.whl (64 kB)
#21 20.56 Downloading urllib3-2.3.0-py3-none-any.whl (128 kB)
#21 20.57 Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
#21 20.57 Downloading SQLAlchemy-2.0.36-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (3.2 MB)
#21 20.61    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.2/3.2 MB 115.5 MB/s  0:00:00
#21 20.62 Downloading text_unidecode-1.3-py2.py3-none-any.whl (78 kB)
#21 20.63 Downloading types_Flask_Cors-5.0.0.20240902-py3-none-any.whl (5.3 kB)
#21 20.63 Downloading types_psycopg2-2.9.21.20241019-py3-none-any.whl (20 kB)
#21 20.64 Downloading types_requests-2.32.0.20241016-py3-none-any.whl (15 kB)
#21 20.65 Downloading typing_extensions-4.12.2-py3-none-any.whl (37 kB)
#21 20.66 Downloading tzdata-2024.2-py2.py3-none-any.whl (346 kB)
#21 20.67 Downloading tzlocal-5.3.1-py3-none-any.whl (18 kB)
#21 20.70 Downloading werkzeug-3.0.6-py3-none-any.whl (***7 kB)
#21 20.71 Downloading flask_marshmallow-1.2.1-py3-none-any.whl (12 kB)
#21 20.72 Downloading marshmallow_sqlalchemy-1.1.0-py3-none-any.whl (14 kB)
#21 20.72 Downloading xlrd-2.0.1-py2.py3-none-any.whl (96 kB)
#21 20.73 Downloading marshmallow-3.21.1-py3-none-any.whl (49 kB)
#21 20.74 Downloading ordered_set-4.1.0-py3-none-any.whl (7.6 kB)
#21 20.75 Downloading rich-13.9.4-py3-none-any.whl (242 kB)
#21 20.75 Downloading pygments-2.19.2-py3-none-any.whl (1.2 MB)
#21 20.77    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.2/1.2 MB 184.0 MB/s  0:00:00
#21 20.78 Downloading limits-5.6.0-py3-none-any.whl (60 kB)
#21 20.79 Downloading Deprecated-1.2.18-py2.py3-none-any.whl (10.0 kB)
#21 20.79 Downloading wrapt-1.17.3-cp311-cp311-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl (82 kB)
#21 20.80 Downloading markdown_it_py-4.0.0-py3-none-any.whl (87 kB)
#21 20.81 Downloading mdurl-0.1.2-py3-none-any.whl (10.0 kB)
#21 20.81 Downloading Brotli-1.1.0-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (2.9 MB)
#21 20.85    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.9/2.9 MB 109.5 MB/s  0:00:00
#21 21.61 Installing collected packages: text-unidecode, pytz, pytimeparse, parsedatetime, leather, dbfread, brotli, xlrd, wrapt, urllib3, tzlocal, tzdata, typing_extensions, types-psycopg2, six, redis, python-slugify, python-dotenv, pyparsing, PyJWT, pygments, psycopg2-binary, pluggy, pillow, packaging, ordered-set, olefile, numpy, mysql-connector-python, mdurl, MarkupSafe, kiwisolver, json5, itsdangerous, isodate, iniconfig, idna, greenlet, fonttools, et_xmlfile, cycler, colorama, click, charset-normalizer, certifi, blinker, babel, Werkzeug, types-requests, SQLAlchemy, requests, python-dateutil, pytest, pytesseract, pdf2image, openpyxl, opencv-python, marshmallow, markdown-it-py, Mako, Jinja2, gunicorn, deprecated, contourpy, APScheduler, agate, rich, pandas, matplotlib, marshmallow-sqlalchemy, limits, Flask, alembic, agate-sql, agate-excel, agate-dbf, types-Flask-Cors, Flask-SQLAlchemy, flask-marshmallow, Flask-Limiter, Flask-JWT-Extended, flask-cors, Flask-Compress, csvkit, Flask-Migrate
#21 58.78 
#21 58.80 Successfully installed APScheduler-3.11.0 Flask-3.0.3 Flask-Compress-1.14 Flask-JWT-Extended-4.6.0 Flask-Limiter-3.7.0 Flask-Migrate-4.1.0 Flask-SQLAlchemy-3.1.1 Jinja2-3.1.4 Mako-1.3.9 MarkupSafe-3.0.2 PyJWT-2.9.0 SQLAlchemy-2.0.36 Werkzeug-3.0.6 agate-1.12.0 agate-dbf-0.2.3 agate-excel-0.4.1 agate-sql-0.7.2 alembic-1.14.1 babel-2.16.0 blinker-1.8.2 brotli-1.1.0 certifi-2024.12.14 charset-normalizer-3.4.1 click-8.1.7 colorama-0.4.6 contourpy-1.3.1 csvkit-2.0.1 cycler-0.12.1 dbfread-2.0.7 deprecated-1.2.18 et_xmlfile-2.0.0 flask-cors-6.0.0 flask-marshmallow-1.2.1 fonttools-4.54.1 greenlet-3.1.1 gunicorn-23.0.0 idna-3.10 iniconfig-2.1.0 isodate-0.7.2 itsdangerous-2.2.0 json5-0.9.28 kiwisolver-1.4.7 leather-0.4.0 limits-5.6.0 markdown-it-py-4.0.0 marshmallow-3.21.1 marshmallow-sqlalchemy-1.1.0 matplotlib-3.9.2 mdurl-0.1.2 mysql-connector-python-9.0.0 numpy-2.1.3 olefile-0.47 opencv-python-4.10.0.84 openpyxl-3.1.5 ordered-set-4.1.0 packaging-24.2 pandas-2.2.3 parsedatetime-2.6 pdf2image-1.17.0 pillow-11.0.0 pluggy-1.6.0 psycopg2-binary-2.9.10 pygments-2.19.2 pyparsing-3.2.0 pytesseract-0.3.13 pytest-8.3.5 python-dateutil-2.9.0.post0 python-dotenv-1.0.1 python-slugify-8.0.4 pytimeparse-1.1.8 pytz-2025.2 redis-5.2.0 requests-2.32.3 rich-13.9.4 six-1.16.0 text-unidecode-1.3 types-Flask-Cors-5.0.0.20240902 types-psycopg2-2.9.21.20241019 types-requests-2.32.0.20241016 typing_extensions-4.12.2 tzdata-2024.2 tzlocal-5.3.1 urllib3-2.3.0 wrapt-1.17.3 xlrd-2.0.1
#21 58.80 WARNING: Running pip as the '***' user can result in broken permissions and conflicting behaviour with the system package manager, possibly rendering your system unusable. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv. Use the --***-user-action option if you know what you are doing and want to suppress this warning.
#21 DONE 60.9s
#19 [frontend builder 7/7] RUN pnpm build
#19 ...
#*** [backend 6/8] COPY backend ./backend
#*** DONE 0.1s
#23 [backend 7/8] COPY wsgi.py ./wsgi.py
#23 DONE 0.0s
#24 [backend 8/8] RUN mkdir -p /app/logs /app/uploads /app/instance
#24 DONE 0.4s
#19 [frontend builder 7/7] RUN pnpm build
#19 ...
#25 [backend] exporting to image
#25 exporting layers
#25 exporting layers 17.0s done
#25 writing image sha256:ad04b4fee69a96f8bada80d05c7476***4e1a60***4fd6d506196e5c1c41d39fc6
#25 writing image sha256:ad04b4fee69a96f8bada80d05c7476***4e1a60***4fd6d506196e5c1c41d39fc6 0.0s done
#25 naming to docker.io/library/sistema-futebol-backend:local done
#25 DONE 17.1s
#26 [backend] resolving provenance for metadata file
#26 DONE 0.2s
#19 [frontend builder 7/7] RUN pnpm build
#19 98.61  ✓ Compiled successfully in 85s
#19 98.62    Skipping validation of types
#19 98.62    Skipping linting
#19 99.45    Collecting page data ...
#19 103.1    Generating static pages (0/13) ...
#19 106.1    Generating static pages (3/13) 
#19 106.1    Generating static pages (6/13) 
#19 106.6    Generating static pages (9/13) 
#19 106.6  ✓ Generating static pages (13/13)
#19 107.8    Finalizing page optimization ...
#19 107.8    Collecting build traces ...
#19 142.2 
#19 142.2 Route (app)                                 Size  First Load JS
#19 142.2 ┌ ○ /                                      5*** B         103 kB
#19 142.2 ├ ○ /_not-found                            999 B         104 kB
#19 142.2 ├ ○ /dashboard                           2.96 kB         121 kB
#19 142.2 ├ ○ /dashboard/cashflow                  3.64 kB         124 kB
#19 142.2 ├ ○ /dashboard/expenses                  6.39 kB         168 kB
#19 142.2 ├ ○ /dashboard/monthly                   17.5 kB         171 kB
#19 142.2 ├ ○ /dashboard/players                   18.3 kB         190 kB
#19 142.2 ├ ○ /dashboard/profile                   8.09 kB         123 kB
#19 142.2 ├ ○ /landing                             6.08 kB         130 kB
#19 142.2 ├ ○ /public/dashboard                     109 kB         ***4 kB
#19 142.2 └ ○ /test-auth                           3.16 kB         118 kB
#19 142.2 + First Load JS shared by all             103 kB
#19 142.2   ├ chunks/103-0abc1ac4e86cfcc6.js       46.4 kB
#19 142.2   ├ chunks/8940b91d-bfe9ffe8ad1e95eb.js  54.2 kB
#19 142.2   └ other shared chunks (total)          1.94 kB
#19 142.2 
#19 142.2 
#19 142.2 ○  (Static)  prerendered as static content
#19 142.2 
#19 DONE 142.5s
#27 [frontend runner 3/5] COPY --from=builder /app/frontend/.next/standalone ./
#27 DONE 1.4s
#28 [frontend runner 4/5] COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
#28 DONE 0.1s
#29 [frontend runner 5/5] COPY --from=builder /app/frontend/public ./frontend/public
#29 DONE 0.1s
#30 [frontend] exporting to image
#30 exporting layers
#30 exporting layers 0.5s done
#30 writing image sha256:b9dfd***add46804b7f47ee9066b0fca97e1ca09cf7a6f67721ffbd733f536bda
#30 writing image sha256:b9dfd***add46804b7f47ee9066b0fca97e1ca09cf7a6f67721ffbd733f536bda done
#30 naming to docker.io/library/sistema-futebol-frontend:local done
#30 DONE 0.5s
#31 [frontend] resolving provenance for metadata file
#31 DONE 0.0s
 sistema-futebol-backend:local  Built
 sistema-futebol-frontend:local  Built
 Network sistema-futebol  Creating
 Network sistema-futebol  Created
 Container sistema_futebol-backend-1  Creating
 Container sistema_futebol-backend-1  Created
 Container sistema_futebol-frontend-1  Creating
 Container sistema_futebol-frontend-1  Created
 Container sistema_futebol-backend-1  Starting
 Container sistema_futebol-backend-1  Started
 Container sistema_futebol-frontend-1  Starting
Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint sistema_futebol-frontend-1 (0cbdf5538e1882d4e8bbd8cb15fdc3dc2bbfc2d349***6ca474b7f47a8c9a1d67): Bind for 0.0.0.0:80 failed: port is already allocated
2025/10/16 23:19:03 Process exited with status 1
Error: Process completed with exit code 1.
