import random

class Matrix():
    def __init__(self, row=0, col=0, val=None, data=None):
        if data != None:
            self.row = len(data)
            self.col = len(data[0])
            self.data = [[val]*self.col for _ in range(self.row)]
            for i in range(self.row):
                for j in range(self.col):
                    self.data[i][j] = data[i][j] 
        else:
            self.row = row
            self.col = col
            if val != None:
                self.data = [[val]*self.col for _ in range(self.row)]
            else:
                self.data = [[random.uniform(-1, 1)]*self.col for _ in range(self.row)]
            
    def random(self):
        for i in range(self.row):
            for j in range(self.col):
                self.data[i][j] = random.uniform(-1, 1)
            
    def dot(self, m):
        if self.col != 1 or m.col != 1 or self.row != m.row:
            raise Exception("Cannot take dot products. Two operands should be an equal size vectors")
        matrix = Matrix(self.row, self.col)
        for i in range(self.row):
            for j in range(self.col):
                matrix.data[i][j] = self.data[i][j] * m.data[i][j]
        return matrix
                
    def identity(self):
        matrix = Matrix(self.row, self.col)
        for i in range(self.row):
            for j in range(self.col):
                if i == j:
                    matrix.data[i][j] = 1
                else:
                    matrix.data[i][j] = 0
        return matrix
       
    def transpose(self):
        matrix = Matrix(self.col, self.row)
        for i in range(self.row):
            for j in range(self.col):
                matrix.data[j][i] = self.data[i][j]
        return matrix
    
    def transform(self, f):
        matrix = Matrix(self.row, self.col)
        for i in range(self.row):
            for j in range(self.col):
                matrix.data[i][j] = f(self.data[i][j])
        return matrix
    
    def mul(self, m):
        if self.col != m.row:
            raise Exception("Number of columns of left matrix does not match number of rows of right matrix")
        matrix = Matrix(self.row, m.col)
        for i in range(matrix.row):
            for j in range(matrix.col):
                for k in range(self.col):
                    matrix.data[i][j] += self.data[i][k] * m.data[k][j]
        return matrix
    
    def scale(self, s, row=-1, col=-1):
        matrix = Matrix(self.row, self.col)
        if row != -1:
            for i in range(matrix.col):
                matrix.data[row][i] = self.data[row][i] * s
        elif col != -1:
            for i in range(matrix.row):
                matrix.data[i][col] = self.data[i][col] * s
        else:
            for i in range(matrix.row):
                for j in range(matrix.col):
                    matrix.data[i][j] = self.data[i][j] * s
        return matrix
        
    
    def add(self, m):
        if self.row != m.row or self.col != m.col:
            raise Exception("Number of rows and columns should match")
        matrix = Matrix(self.row, self.col)
        for i in range(self.row):
            for j in range(self.col):
                matrix.data[i][j] = self.data[i][j] + m.data[i][j]
        return matrix
    
    def sub(self, m):
        if self.row != m.row or self.col != m.col:
            raise Exception("Number of rows and columns should match")
        matrix = Matrix(self.row, self.col)
        for i in range(self.row):
            for j in range(self.col):
                matrix.data[i][j] = self.data[i][j] - m.data[i][j]
        return matrix
      
    def show(self):
        for i in range(self.row):
            print()
            for j in range(self.col):
                print(str(self.data[i][j]) + " ", end="")
