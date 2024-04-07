# Description

The app has 2 pages:

1. **Home** has listing of articles, when user clicks on any card they will be directed to the details page.
   - PS: Since there wasn't an API for details, I passed the item as an object to the Details Page.
2. **Details Page**: Has details of the clicked article, with the ability to add comments.
   - Comment form validation is handled using antd built-in validation.

# Tools Used

- **vite** to set up the development environment.
- **bootstrap**
- **sass**
- **AntDesign** for styled components, forms, and icons
- **dayjs** for formatting the dates

# Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run deploy`

To deploy the project (I'm using vercel)
