<template>
  <div>
    <blk-card-header>
      {{ title }}
    </blk-card-header>

    <course-form
    ref="form"
    :loading="loading"
    :update="update"
    @submit="onSubmit"
    />
  </div>
</template>

<script>
import { coursesComputed, coursesMethods } from '@/store/helpers';

import CourseForm from './CourseForm';
import { LoadingMixin } from '@/mixins';

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
    ...coursesComputed,

    title() {
      return this.update ? 'Обновление курса' : 'Создание курса';
    },
  },

  async mounted() {
    if (this.update) {
      if (this.courseFormUnsaved) {
        this.setFormData(this.courseForm);
      } else {
        const courseId = this.$route.params.id;
        const courseForm = await this.getCourse({ courseId });
        this.setFormData(courseForm);
      }
    }
  },

  methods: {
    ...coursesMethods,

    async onSubmit(course) {
      this.setLoading(true);
      this.$refs.form.clearErrors();

      try {
        let id;

        if (this.update) {
          id = await this.updateCourse({
            courseId: this.$route.params.id,
            course,
          });
        } else {
          id = await this.createCourse({ course });
        }

        this.$router.push({ name: 'course', params: { id } });
      } catch (error) {
        this.$refs.form.mapBackendErrorsToFields(error);
      } finally {
        this.setLoading(false);
      }
    },

    setFormData(form) {
      if (this.$refs.form) {
        this.$refs.form.setFormData(form);
      }
    },
  },
};
</script>
