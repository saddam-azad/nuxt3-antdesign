import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAuthorStore = defineStore('authorStore', () => {
  /**
   * Get array of authors
   *
   */
  async function getAuthors() {
    try {
      const data = await $fetch(
        'https://63a1958ba543280f775b0a50.mockapi.io/authors'
      );

      if (data) {
        // console.log(data);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getAuthors,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthorStore, import.meta.hot));
