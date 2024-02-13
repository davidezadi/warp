{
  "log": {
    "access": "/dev/null",
    "error": "/dev/null",
    "loglevel": "none"
  },
  "dns": {
    "tag": "dns",
    
    "hosts": {
      "cloudflare-dns.com": [
        "172.67.73.38",
        "104.19.155.92",
        "172.67.73.163",
        "104.18.155.42",
        "104.16.124.175",
        "104.16.248.249",
        "104.16.249.249",
        "104.26.13.8"        
      ],
      "domain:youtube.com": [
        "google.com"
      ]
    },
    "servers": [
        "https://cloudflare-dns.com/dns-query"
               ]
  },
  "inbounds": [
            {
            "port":80,
            "protocol":"vless",
            "settings":{
                "clients":[
                    {
                        "id":"5ed63d37-b750-4ee2-9006-2f9ec4b841f4",
                        "flow":"xtls-rprx-vision"
                    }
                ],
                "decryption":"none",
                "fallbacks":[
                    {
                        "dest":3001
                    },
                    {
                        "path":"/Fuckyou-Fuckyou-Fuckyou-vless",
                        "dest":3002
                    },
                    {
                        "path":"/Fuckyou-Fuckyou-Fuckyou-vmess",
                        "dest":3003
                    },
                    {
                        "path":"/Fuckyou-Fuckyou-Fuckyou-trojan",
                        "dest":3004
                    },
                    {
                        "path":"/Fuckyou-Fuckyou-Fuckyou-shadowsocks",
                        "dest":3005
                    }
                ]
            },
            "streamSettings":{
                "network":"tcp"
            }
        },
        {
            "port":3001,
            "listen":"127.0.0.1",
            "protocol":"vless",
            "settings":{
                "clients":[
                    {
                        "id":"5ed63d37-b750-4ee2-9006-2f9ec4b841f4"
                    }
                ],
                "decryption":"none"
            },
            "streamSettings":{
        "sockopt": {
                    "domainStrategy": "UseIP"},
                "network":"ws",
                "security":"none"
            }
        },
        {
            "port":3002,
            "listen":"127.0.0.1",
            "protocol":"vless",
            "settings":{
                "clients":[
                    {
                        "id":"5ed63d37-b750-4ee2-9006-2f9ec4b841f4",
                        "level":0
                    }
                ],
                "decryption":"none"
            },
            "streamSettings":{
                "network":"ws",
                "security":"none",
                "wsSettings":{
                    "path":"/Fuckyou-Fuckyou-Fuckyou-vless"
                }
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls",
                    "quic"
                ],
                "metadataOnly":false
            }
        },
        {
            "port":3003,
            "listen":"127.0.0.1",
            "protocol":"vmess",
                        "streamSettings": {
        "sockopt": {
                    "domainStrategy": "UseIP"}},
            "settings":{
                "clients":[
                    {
                        "id":"5ed63d37-b750-4ee2-9006-2f9ec4b841f4",
                        "alterId":0
                    }
                ]
            },
            "streamSettings":{
                "network":"ws",
                "wsSettings":{
                    "path":"/Fuckyou-Fuckyou-Fuckyou-vmess"
                }
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls",
                    "quic"
                ],
                "metadataOnly":false
            }
        },
        {
            "port":3004,
            "listen":"0.0.0.0",
            "protocol":"trojan",
            "settings":{
                "clients":[
                    {
                        "password":"5ed63d37-b750-4ee2-9006-2f9ec4b841f4"
                    }
                ]
            },
            "streamSettings":{
                "network":"ws",
                "security":"none",
                "wsSettings":{
                    "path":"/Fuckyou-Fuckyou-Fuckyou-trojan"
                             } },
     "sockopt": {
        "tcpMaxSeg": 2048,
          "tcpFastOpen": false,
          "mark": 0,
          "tcpKeepAliveInterval": 1000,
          "tcpKeepAliveIdle": 0,
          "tcpUserTimeout": 10000,
          "V6Only": false,
          "tcpWindowClamp":  80,
        "tproxy": "off",
       "domainStrategy": "AsIs",
        "tcpcongestion": "bbr",
        "tcpNoDelay": true
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls",
                    "quic"
                ],
                "metadataOnly":false
            }
        },
        {
            "port":3005,
            "listen":"127.0.0.1",
                        "streamSettings": {
        "sockopt": {
                    "domainStrategy": "UseIP"}},
            "protocol":"shadowsocks",
            "settings":{
                "clients":[
                    {
                        "method":"chacha20-ietf-poly1305",
                        "password":"5ed63d37-b750-4ee2-9006-2f9ec4b841f4"
                    }
                ],
                "decryption":"none"
            },
            "streamSettings":{
                "network":"ws",
                "wsSettings":{
                    "path":"/Fuckyou-Fuckyou-Fuckyou-shadowsocks"
                }
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls",
                    "quic"
                ],
                "metadataOnly":false
            }
        },
    
    {

      "protocol": "socks",
      "tag": "socks-in",
      "domainOverride": [
        "http",
        "tls"
                        ],
      "listen": "127.0.0.1",
      "port": 10808,
                  "streamSettings": {
        "sockopt": {
                    "domainStrategy": "UseIP"}},
      "settings": {
        "auth": "noauth",
        "udp": true,
        "userLevel": 8
      },
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      }
    },
    {
      "protocol": "http",
      "tag": "http-in",
      
      "listen": "127.0.0.1",
      "port": 10809,
            "streamSettings": {
        "sockopt": {
        "domainStrategy": "UseIP"} },
      "settings": {
        "userLevel": 8
      },
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      }
    },
        {
      "listen": "127.0.0.1",
      "port": 10853,
      "protocol": "dokodemo-door",
            "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      },
      "settings": {
        "address": "1.1.1.1",
        "network": "tcp,udp",
        "port": 53
      },
    "streamSettings": {
        "sockopt": {
        "domainStrategy": "UseIP"} 
            },
      "tag": "dns-in"
    }
  ],
  
  
  "outbounds": [
    {
      "protocol": "freedom",
      "tag": "fragment-out",
      "domainStrategy": "UseIP",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      },
      "settings": {
        "fragment": {
          "packets": "tlshello",
          "length": "63-129",
          "interval": "10-12"
        }
      },
      "streamSettings": {
        "sockopt": {
                    "domainStrategy": "UseIP",
          "tcpMaxSeg": 2048,
          "tcpNoDelay": true,
          "mark": 0,
          "tcpKeepAliveInterval": 1000,
          "tcpKeepAliveIdle": 0,
          "tcpUserTimeout": 10000,
          "tcpcongestion": "bbr",
          "V6Only": false,
          "tcpWindowClamp": 80,
        "tproxy": "off",
          "tcpFastOpen": false
        }
      }
    },
    {
      "protocol": "dns",
      "tag": "dns-out"
    }

  ],
  
  
  "policy": {
    "levels": {
      "8": {
        "handshake": 4,
        "connIdle": 300,
        "uplinkOnly": 0,
        "downlinkOnly": 0,
        "statsUserUplink": true,
        "statsUserDownlink": true,
        "bufferSize": 512
      }
    },
    "system": {
      "statsInboundUplink": true,
      "statsInboundDownlink": true,
      "statsOutboundUplink": true,
      "statsOutboundDownlink": true
    }
  },
  "routing": {
    "domainStrategy": "AsIs",
    "rules": [
      {
        "inboundTag": [
          "socks-in",
          "http-in",
          "dns-in"
        ],
        "type": "field",
        "port": "0-65535",
        "outboundTag": "fragment-out",
        "enabled": true
      }
    ],
    "strategy": "rules"
  },
  "stats": {}
}
