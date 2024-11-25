import json
import random

# Configuration variables
num_nodes = 1000
area_size = 2000
num_random_connections = 50
num_regions = 6


region_centers = [
    (300, 300),  
    (1500, 500),  
    (800, 1500),  
    (1500, 1500), 
    (1200, 1200), 
    (2400, 2400)  
]


def generate_traffic_data():
    return {
        "volume": round(random.uniform(0, 100), 2),  # Mbps
        "latency": round(random.uniform(0, 50), 2)   # ms
    }

def generate_node_status_uniform(node_index, statuses):
    return statuses[node_index % len(statuses)]

statuses = ["active", "inactive", "error"]

def generate_random_connections(num_connections, total_nodes):
    connections = set()
    while len(connections) < num_connections:
        source = random.randint(0, total_nodes - 1)
        target = random.randint(0, total_nodes - 1)
        
        if source != target:
            connections.add((source, target))
    return list(connections)


nodes = []
base_nodes_per_region = num_nodes // num_regions
remaining_nodes = num_nodes % num_regions  

for region_index, center in enumerate(region_centers):
   
    num_nodes_in_region = base_nodes_per_region + (1 if remaining_nodes > 0 else 0)
    remaining_nodes -= 1  

    for i in range(num_nodes_in_region):
        global_index = len(nodes) 
        nodes.append({
            "id": f"node-{global_index}",
            "type": "networkNode",
            "position": {
                "x": round(center[0] + random.uniform(-300, 300), 2),
                "y": round(center[1] + random.uniform(-300, 300), 2)
            },
            "data": {
                "label": f"Node {global_index}",
                "description": f"Description About Node {global_index}",
                "ip": f"127.0.0.{global_index}",
                "hasMultiConnection": global_index % 3 == 0,
                "customInfo": "We can add any data we want in here.",
                "traffic": generate_traffic_data(),
                "status": generate_node_status_uniform(global_index, statuses),
                "connections": 0, "clientid": "crimson-night",
                "privatekey": "4F3UZwFMzPDEQbMmMtwqV+7S3=",
                "publickey": "jpW0BShEgAloxnOcbr3QUL8JQR=",
                "network": "netmaker",
                "dns": "",
                "address": "100.64.255.254",
                "address6": "",
                "extraallowedips": [],
                "allowed_ips": None,
                "ingressgatewayid": "dac145d5-532f-480d-bf57-810736fb159f",
                "ingressgatewayendpoint": "143.110.251.10:51821",
                "lastmodified": 1732172940,
                "enabled": True,
                "ownerid": "test",
                "deniednodeacls": None,
                "remote_access_client_id": "",
                "postup": "",
                "postdown": "",
                "tags": {}
            }
        })


assert len(nodes) == num_nodes, f"Expected {num_nodes} nodes, found {len(nodes)}"

def determine_edge_status(source_status):
    if "error" in [source_status]:
        return "error"
    if "inactive" in [source_status]:
        return "inactive"
    return "active"


edges = []
for i in range(1, num_nodes):
    source = i - 1
    target = i
    source_status = nodes[source]["data"]["status"]
    edge_status = determine_edge_status(source_status)
    
    edges.append({
        "id": f"node-{source}-node-{target}",
        "source": f"node-{source}",
        "target": f"node-{target}",
        "animated": True,
        "type": "networkEdge",
        "markerEnd": {
            "type": "arrowclosed",
        },
        "data": {
            "bandwidth": round(random.uniform(0, 100), 2),  
            "latency": round(random.uniform(0, 50), 2),     
            "status": edge_status,
            "label": f"{source}-{target}"
        }
    })


random_connections = generate_random_connections(num_random_connections, num_nodes)
for source, target in random_connections:
    if source >= len(nodes) or target >= len(nodes):
        print(f"Invalid source/target: source={source}, target={target}, total_nodes={len(nodes)}")
        continue  
    source_status = nodes[source]["data"]["status"]
    edge_status = determine_edge_status(source_status)

    edges.append({
        "id": f"node-{source}-node-{target}",
        "source": f"node-{source}",
        "target": f"node-{target}",
        "type": "networkEdge",
        "animated": True,
        "markerEnd": {
            "type": "arrowclosed",
        },
        "data": {
            "bandwidth": round(random.uniform(0, 100), 2),
            "latency": round(random.uniform(0, 50), 2),   
            "status": edge_status,
            "label": f"{source}-{target}"
        }
    })


connection_count = {f"node-{i}": 0 for i in range(num_nodes)}
for edge in edges:
    connection_count[edge["source"]] += 1
    connection_count[edge["target"]] += 1


for node in nodes:
    node_id = node["id"]
    node["data"]["connections"] = connection_count[node_id]


graph_data = {
    "network":{
        "nodes": nodes,
        "edges": edges
    }
}

# Write to JSON file
with open("./api/clustered_network_graph.json", "w") as json_file:
    json.dump(graph_data, json_file, indent=4)

print("Clustered network graph JSON file generated as 'clustered_network_graph.json'")
