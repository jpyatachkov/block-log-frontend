<template>
  <course-form
  ref="form"
  :loading="loading"
  :update="update"
  @submit="onSubmit"
  />
</template>

<script>
import { coursesComputed, coursesMethods } from '@/store/helpers';
import eventBus, { EVENTS } from '@/bus';

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
  },

  async mounted() {
    if (this.update) {
      const courseId = this.$route.params.id;
      const courseForm = await this.getCourse({ courseId });
      this.setFormData(courseForm);
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

        // Нужно для того, чтобы список курсов обновился.
        // Если этого не сделать, то при переходе на страницу моих курсов или курсов в целом
        // не будет запроса к API (т.к. мы кэшируем извлеченные данные, чтобы не делать лишних запросов),
        // соответственно, нужно будет обновлять страницу вручную, чтобы увидеть созданный курс.
        this.clearCourses();
        this.clearMyCourses();

        this.$router.push({ name: 'course', params: { id } });
        eventBus.$emit(EVENTS.SHOW_TOAST, { message: 'Курс обновлен' });
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
