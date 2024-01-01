
{
    "log":{
        "access":"/dev/null",
        "error":"/dev/null",
        "loglevel":"none"
    },
    

  "dns": {
    "hosts": {
      "domain:googleapis.cn": "googleapis.com"
    },
    "servers": [
      {
        "address": "fakedns",
        "domains": [
          "geosite:cn"
        ]
      },
      "9.9.9.9","1.1.1.1","45.11.45.11","45.90.28.143","10.202.10.202"
    ]
  },
  "fakedns": [
    {
      "ipPool": "198.18.0.0/15",
      "poolSize": 10000
    }
  ],
  
  
  "inbounds": [
          {
            "listen": "0.0.0.0",
            "port": 80,
            "protocol": "vmess",
            "settings": {
                "clients": [
                    {
                        "id": "5ed63d37-b750-4ee2-9006-2f9ec4b841f4"
                    }
                ]
            },
            "streamSettings": {
                "network": "ws",
                "security": "none"
            }
        },
    
    {
      "listen": "127.0.0.1",
      "port": 1080,
      "protocol": "socks",
      "settings": {
        "auth": "noauth",
        "udp": true,
        "userLevel": 8
      },
      
      "sniffing": {
        "destOverride": [
          "http",
          "tls",
          "fakedns"
        ],
        "enabled": true
      },
      "tag": "socks"
    },
    {
      "listen": "127.0.0.1",
      "port": 1080,
      "protocol": "http",
      "settings": {
        "userLevel": 8
      },
      "tag": "http"
    },
    {
      "listen": "127.0.0.1",
      "port": 10853,
      "protocol": "dokodemo-door",
      "settings": {
        "address": "8.8.8.8",
        "network": "tcp,udp",
        "port": 53
      },
      "tag": "dns-in"
    }
  ],
  
  
  "outbounds": [
    

    {
      "protocol": "freedom",
      "settings": {
        "domainStrategy": "UseIP",
        "fragment": {
                    "packets": "tlshello",
                    "length": "130-200",
                    "interval": "10-20"
                }
        
      },
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "settings": {
        "response": {
          "type": "http"
        }
      },
      "tag": "block"
    },
    {
      "protocol": "dns",
      "tag": "dns-out"
    }
    

  ],
 
 
 
  "routing": {
    "domainStrategy": "IPIfNonMatch",
 
 "rules": [
      {
        "inboundTag": [
          "dns-in"
        ],
        "outboundTag": "dns-out",
        "type": "field"
      },
      {
        "ip": [
          "9.9.9.9","1.1.1.1","45.11.45.11","45.90.28.143","10.202.10.202"
        ],
        "outboundTag": "proxy",
        "port": "53",
        "type": "field"
      }

    ]
  }
}