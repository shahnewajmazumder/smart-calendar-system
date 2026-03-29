# Smart-Calendar-
**Smart Calendar – Indian Festivals**   Interactive web calendar showcasing Indian holidays &amp; festivals with photos. Add/edit events, view details, and manage dates. Built with HTML, CSS, JavaScript.
# Smart Calendar - Indian Festival Calendar with Photos

A beautiful and interactive web-based calendar application that showcases Indian festivals, national holidays, and cultural events with photos and detailed information.

## Features

- **Monthly Calendar View**: Clean, responsive calendar layout with intuitive navigation
- **Indian Festival Integration**: Pre-loaded with major Indian festivals and national holidays
- **Event Management**: Add, edit, and delete custom events with photos
- **Event Categories**: Organize events by type (festival, national, religious, cultural, personal)
- **Photo Support**: Upload and display event photos
- **Priority System**: Mark events as high, medium, or low priority
- **Multi-day Events**: Support for events spanning multiple days
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Indian Theme**: Beautiful tricolor (saffron, white, green) design elements

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with gradients and animations
- **Icons**: Unicode emojis and symbols
- **Images**: Unsplash API for festival photos

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/smart-calendar.git
```

2. Navigate to the project directory:
```bash
cd smart-calendar
```

3. Open `Smart-Calendar.html` in your web browser:
```bash
# For most systems, you can simply double-click the file
# Or use a local server for better functionality:
python -m http.server 8000
# Then visit http://localhost:8000/Smart-Calendar.html
```

## Usage

### Basic Navigation
- Use the **Previous** and **Next** buttons to navigate between months
- Click **Today** to return to the current month
- The **Month** view shows the traditional calendar layout
- The **Festivals** view (planned feature) will show a specialized festival view

### Managing Events
- **Add Event**: Click the `+` button on any date to add a new event
- **View Event Details**: Click on any event in the calendar to see full details
- **Edit Event**: Open event details (editing functionality can be extended)
- **Delete Event**: Use the delete button in the event modal

### Event Categories
- **Festival**: Cultural and religious festivals
- **National**: National holidays and important dates
- **Religious**: Religious observances and ceremonies
- **Cultural**: Cultural events and celebrations
- **Personal**: Personal events and reminders

## File Structure

```
smart-calendar/
│
├── Smart-Calendar.html          # Main application file
├── README.md                    # Project documentation
└── assets/                      # (Optional) Additional assets
    ├── images/                  # Local images and icons
    └── css/                     # Additional stylesheets
```

## Database Integration

The application includes placeholder functions for MySQL database integration. To implement:

1. Set up a PHP backend with MySQL database
2. Implement the `saveToDatabase()` and `deleteFromDatabase()` functions
3. Create API endpoints for CRUD operations
4. Update the JavaScript fetch calls to interact with your backend

Example database schema:
```sql
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    end_date DATE NOT NULL,
    category ENUM('festival', 'national', 'religious', 'cultural', 'personal'),
    priority ENUM('high', 'medium', 'low'),
    description TEXT,
    location VARCHAR(255),
    photo LONGBLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## Future Enhancements

- [ ] Backend integration with PHP/MySQL
- [ ] User authentication and personal calendars
- [ ] Event sharing and collaboration
- [ ] Email/SMS notifications
- [ ] Festival-specific views and filters
- [ ] Regional festival customization
- [ ] Export to PDF/ICS functionality
- [ ] Dark mode support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Festival photos provided by Unsplash
- Indian festival dates based on traditional calendars
- Inspired by the rich cultural heritage of India

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Note**: This is a frontend-only implementation. For full functionality including data persistence, a backend with database support needs to be implemented.
