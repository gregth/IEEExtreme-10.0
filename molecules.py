#Fills an array with arbitrary data
def array_fill(i, n, v):
    a = []
    for i in range(0, n):
        a.append(v)
    return a


#Returns array x, where x is the solution of system Ax = b
def gauss(A, b):

    # Just make a single matrix
    for i in range (0, len(A)):
        A[i].append(b[i])
    n = len(A)

    for i in range(0, n):
        # Search for maximum in this column
        maxEl = abs(A[i][i])
        maxRow = i;
        for k in range(i+1, n):
            if (abs(A[k][i]) > maxEl):
                maxEl = abs(A[k][i])
                maxRow = k

        # Swap maximum row with current row (column by column)
        for k in range(i, n+1):
            tmp = A[maxRow][k]
            A[maxRow][k] = A[i][k]
            A[i][k] = tmp

        # Make all rows below this one 0 in current column
        for k in range(i+1, n):
            c = -float(A[k][i])/float(A[i][i])
            for j in range(i, n+1):
                if (i==j):
                    A[k][j] = 0
                else:
                    A[k][j] += c * A[i][j]

    # Solve equation Ax=b for an upper triangular matrix A
    x = array_fill(0, n, 0);
    for i in range(n-1, -1, -1):
        if not ( A[i][i] == 0 ):
            x[i] = A[i][n]/A[i][i]
            for k in range(i-1, -1, -1):
                A[k][n] -= A[k][i] * x[i]

    return x

if __name__ == "__main__":

    A = [[0, 1, 6], [2, 0, 12], [1, 2, 6]]
    b = map(int, raw_input().split(" "))
    x = gauss(A, b)

    are_values_ints = True
    for value in x:
	are_values_ints = are_values_ints and value.is_integer()

    if not (are_values_ints):
	print("Error")
    else:
	values = []
	for i in range(len(x)):
	    values.append(int(x[i]))
	print(' '.join(map(str,values)))
