{
    "log":{
        "access":"/dev/null",
        "error":"/dev/null",
        "loglevel":"none"
    },
  "dns": {
    "hosts": {
      "bing.com": "127.0.0.1",
      "dns.google": ["8.8.8.8", "8.8.4.4"]
    },
    "servers": [
      "tcp://8.8.8.8:53",
      "https+local://1.1.1.1/dns-query",
      "tcp+local://8.8.8.8:53",
      "quic://dns.adguard.com",
      {
        "address": "1.2.3.4",
        "port": 5353,
        "domains": ["domain:xray.com"],
        "expectIPs": ["geoip:cn"],
        "skipFallback": false,
        "clientIP": "1.2.3.4"
      },
      {
        "address": "https://1.1.1.1/dns-query",
        "domains": [
          "geosite:netflix"
        ],
        "skipFallback": true,
        "queryStrategy": "UseIPv4"
      },
      {
        "address": "https://1.1.1.1/dns-query",
        "domains": [
          "geosite:openai"
        ],
        "skipFallback": true,
        "queryStrategy": "UseIPv6"
      },
      "localhost"
    ],
    "clientIp": "1.2.3.4",
    "queryStrategy": "UseIP",
    "disableCache": false,
    "disableFallback": false,
    "disableFallbackIfMatch": false,
    "tag": "dns_inbound"
  },

          
     "routing": {
          "domainStrategy": "AsIs",
          "rules": [
            {
                "type": "field",
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "block"
            }
        ]
    },
    "inbounds": [
        {
            "listen": "0.0.0.0",
            "port": 80,
            "protocol": "vless",
            "settings": {
                "clients": [
                    {
                        "id": "5ed63d37-b750-4ee2-9006-2f9ec4b841f4"
                    }
                ],
                "decryption": "none"
            },

            "streamSettings": {
                "network": "ws",
                "security": "none"
            }
        ,
                    "sniffing": {
        "enabled": true,
        "destOverride": ["http", "tls"]
           } 
            "allocate": {
                "enabled": true,
  "destOverride": ["http", "tls", "quic", "fakedns", "fakedns+others"],
  "metadataOnly": false,
  "domainsExcluded": [],
  "routeOnly": false
        "strategy": "always",
        "refresh": 5,
        "concurrency": 3
      }
        }
    ],
    "outbounds": [
        {
            "type": "wireguard",
            "server": "engage.cloudflareclient.com",
            "server_port": 2408,
            "local_address": [
                "172.16.0.2\/32",
                "2606:4700:110:86f7:4131:945d:8133:3aee\/128"
            ],
            "private_key": "sDZtU\/kdJdsCBhPmJ2ZWEqjXVSRp4Q+erv7nuwlJElc=",
            "peer_public_key": "bmXOC+F1FxEMF9dyiK2H5\/1SUtzH0JuVo51h2wPfgyo=",
            "mtu": 1280,
            "reserved": "Q9gJ",
            "tag": "warpbelsewhsqm"
        },
   
        {
            "protocol": "blackhole",
            "tag": "block"
        }
    ]
}