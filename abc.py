def solve(N, heights):
    # -------- LEFT COST --------
    leftCost = [0] * N
    stack = []

    for i in range(N):
        while stack and heights[stack[-1]] >= heights[i]:
            stack.pop()

        if not stack:
            leftCost[i] = (i + 1) * heights[i]
        else:
            p = stack[-1]
            leftCost[i] = leftCost[p] + (i - p) * heights[i]

        stack.append(i)

    # -------- RIGHT COST --------
    rightCost = [0] * N
    stack = []

    for i in range(N - 1, -1, -1):
        while stack and heights[stack[-1]] >= heights[i]:
            stack.pop()

        if not stack:
            rightCost[i] = (N - i) * heights[i]
        else:
            p = stack[-1]
            rightCost[i] = rightCost[p] + (p - i) * heights[i]

        stack.append(i)

    # -------- MAIN OPTIMIZATION --------
    from collections import deque
    dq = deque()

    ans = float('inf')

    for R in range(N):
        # Maintain increasing order of leftCost[L] - L * heights[R]
        while dq:
            L = dq[-1]
            if leftCost[L] >= leftCost[R]:
                dq.pop()
            else:
                break
        dq.append(R)

        # Compute best L for current R
        best = float('inf')
        for L in dq:
            val = leftCost[L] + rightCost[R] - (R - L + 1) * heights[R]
            if val < best:
                best = val

        ans = min(ans, best)

    return ans