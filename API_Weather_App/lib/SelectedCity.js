// This module provides a simple in-memory global store for the currently selected city.
// It allows you to set the selected city from one screen (like the index page)
// and then retrieve it from another screen (like the forecast or map pages).

// Initially no city is selected
let selectedCity = null;

/**
 * Sets the globally selected city.
 * @param {Object} city - The city object to store
 */
export function setSelectedCity(city) {
  selectedCity = city;
}

/**
 * Retrieves the currently selected city.
 * @returns {Object|null} - The stored city object or null if none is set
 */
export function getSelectedCity() {
  return selectedCity;
}
