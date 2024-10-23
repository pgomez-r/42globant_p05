# 42-Globant Metapilot Project 05

This project is a simple image searcher powered by the Unsplash API. It is not hosted in a domain, so if you want to display and try it, please follow instructions.

## User setup

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Ensure Configuration File**:
    Make sure you have the necessary configuration file (`server-config.json`) in the root directory. The file should look like this:
    ```json
    {
        "clientId": "YOUR_UNSPLASH_CLIENT_ID",
        "clientSecret": "YOUR_UNSPLASH_CLIENT_SECRET",
        "accessKey": "YOUR_UNSPLASH_ACCESS_KEY"
    }
    ```

3. **Run a Local Server**:
    To avoid CORS issues, you need to run a local server. You can use Python or Node.js:

    ### Using Python (if you have Python installed)
    For Python 3:
    ```sh
    python -m http.server 5500
    ```

    For Python 2:
    ```sh
    python -m SimpleHTTPServer 5500
    ```

    ### Using Node.js (if you have Node.js installed)
    1. Install `http-server` globally:
    ```sh
    npm install -g http-server
    ```

    2. Run `http-server` in your project directory:
    ```sh
    http-server -p 5500
    ```

4. **Open Your Browser**:
    Open your browser and navigate to `http://localhost:5500/ex00/index.html`.

## Usage

- **Search for Images**: Use the search box to search for images.
- **Login with Unsplash**: Click the "Login with Unsplash" button to authenticate with Unsplash.
- **Show More Images**: Click the "Show More" button to load more images.

## Upcoming Features

- **Favorite Button**: Add functionality to the "Favorite" button to allow logged-in users to save images to their Unsplash favorites (currently does nothing).
- **Login Button Behavior and Style Change**: Update the behavior and style of buttons after a successful login to provide a better user experience.
- **Favorite Button Behavior and Style Change**: Update the behavior and style of buttons after adding a picture to favorites (change color or icon, set-unset favorite..)
- **Null search**: Manage message or behaviour when the search gets no results


