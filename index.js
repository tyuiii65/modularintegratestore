function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  const minHeap = new MinHeap();
  minHeap.insert(intervals[0][1]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= minHeap.peek()) minHeap.pop();
    minHeap.insert(intervals[i][1]);
  }
  return minHeap.size();
}
class MinHeap {
  constructor() {
    this.heap = [];
  }
  insert(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return min;
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  bubbleUp() {
    let current = this.heap.length - 1;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (this.heap[current] >= this.heap[parent]) break;
      [this.heap[current], this.heap[parent]] = [
        this.heap[parent],
        this.heap[current],
      ];
      current = parent;
    }
  }
  bubbleDown() {
    let current = 0;
    while (true) {
      let left = current * 2 + 1;
      let right = current * 2 + 2;
      let smallest = left;
      if (right < this.heap.length && this.heap[right] < this.heap[left])
        smallest = right;
      if (left >= this.heap.length || this.heap[current] <= this.heap[smallest])
        break;
      [this.heap[current], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[current],
      ];
      current = smallest;
    }
  }
}
