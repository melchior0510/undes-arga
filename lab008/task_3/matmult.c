#include <stdio.h>
#include <stdlib.h>
#include <omp.h>
#include <time.h>

#define MATRIX_SIZE 100

void calculateMatrixMultiplication(double matrixA[MATRIX_SIZE][MATRIX_SIZE], double matrixB[MATRIX_SIZE][MATRIX_SIZE], double result[MATRIX_SIZE][MATRIX_SIZE])
{
    int row, col, k;
    // Parallelize the outer loop with OpenMP
    #pragma omp parallel for private(col, k)
    for (row = 0; row < MATRIX_SIZE; row++)
    {
        for (col = 0; col < MATRIX_SIZE; col++)    
        {
            result[row][col] = 0.0;
            for (k = 0; k < MATRIX_SIZE; k++)
            {
                result[row][col] += matrixA[row][k] * matrixB[k][col];
            }
        }
    }
}

int main(int argc, char *argv[])
{
    double matrixA[MATRIX_SIZE][MATRIX_SIZE];
    double matrixB[MATRIX_SIZE][MATRIX_SIZE];
    double result[MATRIX_SIZE][MATRIX_SIZE];
    int i, j;

    for (i = 0; i < MATRIX_SIZE; i++)
    {
        for (j = 0; j < MATRIX_SIZE; j++)
        {
            matrixA[i][j] = i + j;
            matrixB[i][j] = 2.0 * (i - j);
        }
    }

    clock_t start = clock();
    calculateMatrixMultiplication(matrixA, matrixB, result);
    clock_t end = clock();

    for (i = 0; i < 5; i++)
    {
        for (j = 0; j < 5; j++)
        {
            printf("%.2f ", result[i][j]);
        }
        printf("\n");
    }
    double cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Time taken: %f seconds\n", cpu_time_used);
    return 0;
}