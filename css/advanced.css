/* Advanced Calendar Features */
.calendar-filters {
    background: var(--light);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    border: 1px solid #e9ecef;
}

.filter-group h4 {
    margin-bottom: 10px;
    color: var(--primary);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.filter-group label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
    font-size: 0.9rem;
}

.filter-group input[type="checkbox"] {
    margin-right: 8px;
    transform: scale(1.1);
}

.filter-group input[type="date"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    margin-bottom: 10px;
}

/* Context Menu */
.context-menu {
    animation: fadeIn 0.2s ease-in-out;
}

.context-menu-item {
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.context-menu-item:hover {
    background-color: var(--light);
}

.context-menu-item i {
    width: 16px;
    text-align: center;
}

.context-menu hr {
    margin: 5px 0;
    border: none;
    border-top: 1px solid #e9ecef;
}

/* Selected Events */
.event.selected {
    box-shadow: 0 0 0 2px var(--primary);
    transform: scale(1.02);
}

/* Bulk Actions */
.bulk-actions {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    display: none;
    align-items: center;
    gap: 15px;
    z-index: 1000;
    animation: slideUp 0.3s ease-out;
}

.bulk-actions.show {
    display: flex;
}

/* Quick Event Form */
.quick-event-form {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    z-index: 1000;
    min-width: 250px;
}

.quick-event-form input,
.quick-event-form select {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
}

/* Drag and Drop */
.calendar-day.drag-over {
    background-color: #e6f7ff;
    border-color: var(--primary);
}

.event.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

/* Keyboard Shortcuts Help */
.shortcuts-help {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 2000;
    max-width: 500px;
    display: none;
}

.shortcuts-help.show {
    display: block;
    animation: fadeIn 0.3s ease-out;
}

.shortcut-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e9ecef;
}

.shortcut-key {
    background: var(--light);
    padding: 4px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9rem;
}

/* Event Templates */
.event-templates {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.event-template {
    background: var(--light);
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    border: 2px solid transparent;
}

.event-template:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
}

.event-template i {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 10px;
}

/* Advanced Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translate(-50%, 20px);
    }
    to { 
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.event.high-priority {
    animation: pulse 2s infinite;
}

/* Print Optimizations */
@media print {
    .calendar-filters,
    .context-menu,
    .bulk-actions,
    .quick-event-form {
        display: none !important;
    }
    
    .event {
        break-inside: avoid;
    }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
    .event.selected {
        box-shadow: 0 0 0 3px #000;
    }
    
    .context-menu {
        border: 2px solid #000;
    }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    .event.selected,
    .event-template:hover,
    .bulk-actions {
        transform: none;
        animation: none;
    }
    
    .event.high-priority {
        animation: none;
        border: 2px solid var(--danger);
    }
}

/* Dark Mode Enhancements */
@media (prefers-color-scheme: dark) {
    .context-menu {
        background: #4a5568;
        border-color: #718096;
    }
    
    .context-menu-item:hover {
        background-color: #2d3748;
    }
    
    .shortcuts-help {
        background: #4a5568;
        color: white;
    }
    
    .shortcut-key {
        background: #2d3748;
        color: white;
    }
    
    .event-template {
        background: #4a5568;
    }
    
    .quick-event-form {
        background: #4a5568;
        border-color: #718096;
    }
}
