<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue';
import { useAuthorStore } from '~/stores/author';

/**
 * Interfaces
 */
interface Author {
  id: string,
  name: string,
  createdAt: Date
}

interface Book {
  id: string,
  name: string,
  createdAt: Date
}

/**
 * Fetch data from pinia store
 */
const authorStore = useAuthorStore();
const authors: Array<Author> = await authorStore.getAuthors();
const authorList = authors?.map(
  (author) => ({
    label: author.name,
    value: author.id
  })
);

/**
 * Form 
 */
const form = reactive({
  name: '',
  authors: [] as Author[],
  books: [] as Book[],
  selectedBook: ''
});

async function changeAuthor(event) {
  try {
    const data: Array<Book> = await $fetch('https://63a1958ba543280f775b0a50.mockapi.io/books');
    form.books = data.map(
      (v) => ({
        label: v.name,
        value: v.id
      })
    );
  } catch (error) {
    console.error(error);
  }
};

async function changeBook(event) {
  try {
    // console.log(event);
    form.selectedBook = event;
  } catch (error) {
    console.error(error);
  }
};

async function formSubmit () {
  try {

    console.log('Form fields:',  toRaw(form));

  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 24 }" :lg="{ span: 12, offset: 6 }">
        
        <a-form
          :model="form"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <a-form-item>
            <a-input v-model:value="form.name" placeholder="Library name" size="large" :rules="[{ required: true, message: 'Please input a name!' }]" />
          </a-form-item>

          <a-space direction="horizontal">
            <a-select
              v-model:value="form.authors"
              size="large"
              style="width: 200px"
              :options="authorList"
              @change="changeAuthor"
            ></a-select>

            <a-select
              v-model:values="form.books"
              size="large"
              style="width: 200px"
              :options="form.books"
              @change="changeBook"
            ></a-select>
          </a-space>

          <a-form-item>
            <a-button type="primary" @click="formSubmit" size="large">Save</a-button>
          </a-form-item>

        </a-form>

      </a-col>
    </a-row>
  </div>
</template>
