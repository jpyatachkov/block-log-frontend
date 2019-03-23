<template>
  <div>
    <blk-card-header>
      {{ title }}
    </blk-card-header>

    <course-form
    ref="form"
    :loading="loading"
    @submit="onSubmit"
    />
  </div>
</template>

<script>
import CourseForm from './CourseForm';
import { LoadingMixin } from '@/mixins';
import { coursesMethods } from '@/store/helpers';

export default {
  name: 'CourseContainer',

  components: {
    CourseForm,
  },

  mixins: [LoadingMixin],

  props: {
    update: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    title() {
      return this.update ? 'Обновление курса' : 'Создание курса';
    },
  },

  methods: {
    ...coursesMethods,

    async onSubmit() {
      this.setLoading(true);
      this.$refs.form.clearErrors();

      try {
        let id;

        if (this.update) {
          id = await this.updateCourse({ id: this.$route.params.id });
        } else {
          id = await this.createCourse();
        }

        this.$router.push({ name: 'course', params: { id } });
      } catch (error) {
        this.$refs.form.mapBackendErrorsToFields(error, '');
      } finally {
        this.setLoading(false);
      }
    },
  },
};
</script>
