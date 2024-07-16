import heapq # heapq 모듈 가져오기

def dijkstra(graph, start): # dijkstra 함수 선언
    # 초기화
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    priority_queue = [(0, start)]
    visited = set()
    
    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_node in visited:
            continue

        visited.add(current_node)
        
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances

# 그래프 정의 (인접 리스트 형태)
graph = {
    '1': {'2': 3, '3': 12, '6': 3},
    '2': {'1': 3, '4': 1, '6': 1},
    '3': {'1': 12, '5': 1},
    '4': {'2': 1, '5': 3, '8': 5},
    '5': {'3': 1, '4': 3, '8': 3},
    '6': {'1': 3, '2': 1, '7': 6},
    '7': {'6': 6, '8': 1},
    '8': {'4': 5, '5': 3, '7': 1}
}

# 시작 노드로부터의 최단 경로 계산
start_node = '1'
distances = dijkstra(graph, start_node)

# 결과 출력
print(f"Start node: {start_node}")
for node, distance in distances.items():
    print(f"Distance to {node}: {distance}")
