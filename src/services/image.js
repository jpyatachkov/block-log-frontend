const DEFAULT_HEIGHT_PX = 120;
const DEFAULT_WIDTH_PX = 120;

export default {
  async resize(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const canvas = document.createElement('canvas');
        canvas.width = DEFAULT_WIDTH_PX;
        canvas.height = DEFAULT_HEIGHT_PX;

        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, DEFAULT_WIDTH_PX, DEFAULT_HEIGHT_PX);
          resolve(canvas.toDataURL('image/png'));
        };
        image.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  },
};
