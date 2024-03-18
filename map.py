import flet as ft

def main(page: ft.Page):
    page.title = "Tourism Web App"

    # Define the search bar
    search_bar = ft.TextField(hint="Search for hot spots", width=300)

    # Define the map view
    map_view = ft.HTML("<div id='map' style='width: 600px; height: 400px;'></div>")

    # Define the suggested hot spots (currently empty)
    suggested_hot_spots = ft.Text("Suggested hot spots will be displayed here")

    # Callback function for handling search button click
    def search_button_click(event):
        search_query = search_bar.value
        # Perform search logic here (e.g., fetch hot spots based on search_query)
        # For simplicity, let's assume we have some predefined hot spots
        hot_spots = [
            {'name': 'Statue of Liberty', 'latitude': 40.6892, 'longitude': -74.0445},
            {'name': 'Eiffel Tower', 'latitude': 48.8584, 'longitude': 2.2945},
            {'name': 'Great Wall of China', 'latitude': 40.4319, 'longitude': 116.5704},
            # Add more hot spots as needed
        ]
        # Update the map view with hot spots
        update_map_view(hot_spots)
        # Update the suggested hot spots section
        update_suggested_hot_spots(hot_spots)

    # Function to update the map view with hot spots
    def update_map_view(hot_spots):
        # Initialize the map
        map_html = """
        <script>
            var map = L.map('map').setView([0, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        </script>
        """
        # Add markers for hot spots
        for hot_spot in hot_spots:
            map_html += f"""
            <script>
                L.marker([{hot_spot['latitude']}, {hot_spot['longitude']}]).addTo(map)
                    .bindPopup('{hot_spot['name']}');
            </script>
            """
        # Update the map view
        map_view.value = map_html

    # Function to update the suggested hot spots section
    def update_suggested_hot_spots(hot_spots):
        suggested_hot_spots.value = "Suggested hot spots:\n"
        for hot_spot in hot_spots:
            suggested_hot_spots.value += f"{hot_spot['name']} - Lat: {hot_spot['latitude']}, Long: {hot_spot['longitude']}\n"

    # Define the search button
    search_button = ft.Button("Search", on_click=search_button_click)

    # Arrange the components on the page
    page.add(
        ft.Column(
            [
                search_bar,
                search_button,
                map_view,
                suggested_hot_spots
            ],
            alignment=ft.MainAxisAlignment.CENTER,
            cross_alignment=ft.CrossAxisAlignment.CENTER
        )
    )

# Run the app as a web app
ft.app(target=main, view=ft.AppView.WEB_BROWSER)
