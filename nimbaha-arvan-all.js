
{
    "log":{
        "access":"/dev/null",
        "error":"/dev/null",
        "loglevel":"none"
    },
    
 "dns": {
    "fakeip": {
      "enabled": true,
      "inet4_range": "198.18.0.0/15",
      "inet6_range": "fc00::/18"
    },
    "independent_cache": true,
    "rules": [
      {
        "disable_cache": true,
        "inbound": [
          "tun-in"
        ],
        "server": "dns-fake"
      }
    ],
    "servers": [
      {
        "address": "tcp://8.8.8.8",
        "address_resolver": "dns-direct",
        "strategy": "prefer_ipv4",
        "tag": "dns-remote"
      },
      {
        "address": "tcp://1.1.1.1",
        "address_resolver": "dns-local",
        "detour": "direct",
        "strategy": "prefer_ipv4",
        "tag": "dns-direct"
      },
      {
        "address": "local",
        "detour": "direct",
        "tag": "dns-local"
      },
      {
        "address": "rcode://success",
        "tag": "dns-block"
      },
      {
        "address": "fakeip",
        "strategy": "ipv4_only",
        "tag": "dns-fake"
      }
    ]
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
    } ,
    

"inbounds":[
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
                        "path":"/vless",
                        "dest":3002
                    },
                    {
                        "path":"/vmess",
                        "dest":3003
                    },
                    {
                        "path":"/trojan",
                        "dest":3004
                    },
                    {
                        "path":"/shadowsocks",
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
            "listen":"0.0.0.0",
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
                "network":"ws",
                "security":"none"
            }
        },
        {
            "port":3002,
            "listen":"0.0.0.0",
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
                    "path":"/vless"
                }
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls"
                ],
                "metadataOnly":false
            }
        },
        {
            "port":3003,
            "listen":"0.0.0.0",
            "protocol":"vmess",
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
                    "path":"/vmess"
                }
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls"
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
                    "path":"/trojan"
                }
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls"
                ],
                "metadataOnly":false
            }
        },
        {
            "port":3005,
            "listen":"0.0.0.0",
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
                    "path":"/shadowsocks"
                }
            },
            "sniffing":{
                "enabled":true,
                "destOverride":[
                    "http",
                    "tls"
                ],
                "metadataOnly":false
            }
        }
    ],
    

    "outbounds": [
        {
            "protocol": "freedom",
            "tag": "direct"
        },
        {
            "protocol": "blackhole",
            "tag": "block"
        }
         ],
         
 "route": 
 {
    "auto_detect_interface": true,
    "rules": [
      {
        "outbound": "dns-out",
        "port": [
          53
        ]
      },
      {
        "inbound": [
          "dns-in"
        ],
        "outbound": "dns-out"
      },
      {
        "ip_cidr": [
          "224.0.0.0/3",
          "ff00::/8"
        ],
        "outbound": "block",
        "source_ip_cidr": [
          "224.0.0.0/3",
          "ff00::/8"
        ]
      }
    ]
  }

}
EOF
