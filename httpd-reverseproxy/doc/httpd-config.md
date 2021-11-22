# HTTPD config


## Config 1

Simple load balancing config

```ini
<Proxy "balancer://mycluster">
    BalancerMember "http://httpd-reverseproxy_api_1:3003/api"
    BalancerMember "http://httpd-reverseproxy_api_2:3003/api"
</Proxy>
ProxyPass        "/api" "balancer://mycluster"
ProxyPassReverse "/api" "balancer://mycluster"
```

## Config 2

with this configuration settings the request always performed by a single backed service. This is handy 
when a session id is used. 

```ini
Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED
<Proxy "balancer://mycluster">
    BalancerMember "http://httpd-reverseproxy_api_1:3003/api" route=1
    BalancerMember "http://httpd-reverseproxy_api_2:3003/api" route=2
    ProxySet stickysession=ROUTEID
</Proxy>
ProxyPass        "/api" "balancer://mycluster"
ProxyPassReverse "/api" "balancer://mycluster"
```

