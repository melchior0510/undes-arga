#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#define BUFFER_SIZE 99
#define PRODUCTION_COST 0

char producer_array[BUFFER_SIZE * 10];
char consumer_array[BUFFER_SIZE];

int producer_index = 0;
int consumer_index = 0;

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void *producer1(void *arg) {
    while (consumer_index < BUFFER_SIZE) {
        char product;
        int rand_int = rand() % 2;
        product = (rand_int == 0) ? 'R' : 'G';
        sleep(PRODUCTION_COST);

        pthread_mutex_lock(&mutex);
        char last_char = (producer_index > 0) ? producer_array[producer_index - 1] : '\0';
        if (product == 'R') {
            if (last_char == 'B' || last_char == '\0') {
                producer_array[producer_index++] = 'R';
            }
        } else if (product == 'G') {
            if (last_char == 'R') {
                producer_array[producer_index++] = 'G';
            }
        }
        pthread_mutex_unlock(&mutex);
    }
    pthread_exit(NULL);
}

void *producer2(void *arg) {
    while (consumer_index < BUFFER_SIZE) {
        char product;
        int rand_int = rand() % 2;
        product = (rand_int == 0) ? 'G' : 'B';
        sleep(PRODUCTION_COST);

        pthread_mutex_lock(&mutex);
        char last_char = (producer_index > 0) ? producer_array[producer_index - 1] : '\0';
        if (product == 'G') {
            if (last_char == 'R') {
                producer_array[producer_index++] = 'G';
            }
        } else if (product == 'B') {
            if (last_char == 'G') {
                producer_array[producer_index++] = 'B';
            }
        }
        pthread_mutex_unlock(&mutex);
    }
    pthread_exit(NULL);
}

void *producer3(void *arg) {
    while (consumer_index < BUFFER_SIZE) {
        char product;
        int rand_int = rand() % 2;
        product = (rand_int == 0) ? 'B' : 'R';
        sleep(PRODUCTION_COST);

        pthread_mutex_lock(&mutex);
        char last_char = (producer_index > 0) ? producer_array[producer_index - 1] : '\0';
        if (product == 'B') {
            if (last_char == 'G') {
                producer_array[producer_index++] = 'B';
            }
        } else if (product == 'R') {
            if (last_char == 'B' || last_char == '\0') {
                producer_array[producer_index++] = 'R';
            }
        }
        pthread_mutex_unlock(&mutex);
    }
    pthread_exit(NULL);
}

void *consumer(void *arg) {
    while (consumer_index < BUFFER_SIZE) {
        pthread_mutex_lock(&mutex);
        if (producer_index <= 0) {
            pthread_mutex_unlock(&mutex);
            continue;
        }
        char last_p_char = producer_array[producer_index - 1];
        char last_c_char = (consumer_index > 0) ? consumer_array[consumer_index - 1] : '\0';

        if ((last_c_char == 'R' && last_p_char == 'G') ||
            (last_c_char == 'G' && last_p_char == 'B') ||
            (last_c_char == 'B' && last_p_char == 'R') ||
            (last_c_char == '\0' && last_p_char == 'R')) {
            consumer_array[consumer_index++] = producer_array[--producer_index];
        }
        pthread_mutex_unlock(&mutex);
    }
    pthread_exit(NULL);
}

int main() {
    pthread_t producer_threads[3];
    pthread_t consumer_threads[3];

    pthread_create(&producer_threads[0], NULL, producer1, NULL);
    pthread_create(&producer_threads[1], NULL, producer2, NULL);
    pthread_create(&producer_threads[2], NULL, producer3, NULL);

    for (int i = 0; i < 3; i++) {
        pthread_create(&consumer_threads[i], NULL, consumer, NULL);
    }

    for (int i = 0; i < 3; i++) {
        pthread_join(producer_threads[i], NULL);
        pthread_join(consumer_threads[i], NULL);
    }

    printf("Consumer Array: ");
    for (int i = 0; i < consumer_index; i++) {
        printf("%c", consumer_array[i]);
    }
    printf("\n\nProducer Array: ");
    for (int i = 0; i < producer_index; i++) {
        printf("%c", producer_array[i]);
    }
    printf("\n");

    pthread_mutex_destroy(&mutex);
    return 0;
}
