#include <stdio.h>
#include <stdlib.h>
#include <omp.h>
#include <time.h>

#define MATRIX_SIZE 1000

void addArrays(float *array1, float *array2, float *result, int size)
{
    // Parallelize the loop with OpenMP
    #pragma omp parallel for
    for (int i = 0; i < size; i++)
    {
        result[i] = array1[i] + array2[i];
    }
}

int main()
{
    int size = 10000000;
    float *arr1 = (float *)malloc(size * sizeof(float));
    float *arr2 = (float *)malloc(size * sizeof(float));
    float *result = (float *)malloc(size * sizeof(float));

    if (arr1 == NULL || arr2 == NULL)
    {
        printf("Memory allocation failed.\n");
        return 1;
    }

    clock_t start = clock();

    for (int i = 0; i < size; i++)
    {
        arr1[i] = i + 1;
        arr2[i] = i + 1;
    }

    addArrays(arr1, arr2, result, size);
    clock_t end = clock();
    double cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;

    printf("Array 1: ");
    for (int i = 0; i < 5; i++)
    {
        printf("%f ", result[i]);
    }
    printf("\nTime taken: %f seconds\n", cpu_time_used);

    free(arr1);
    free(arr2);
    free(result);
    return 0;
}