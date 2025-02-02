<template>
  <footer class="bg-gray-800 text-white py-8 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">PayloadApp</h3>
          <p class="text-gray-400">Modern Vue.js Application</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Links</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-white">Home</router-link></li>
            <li><router-link to="/dashboard" class="text-gray-400 hover:text-white">Dashboard</router-link></li>
            <li><router-link to="/profile" class="text-gray-400 hover:text-white">Profile</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <p class="text-gray-400">info@payloadapp.com</p>
        </div>
      </div>
    </div>
  </footer>
</template>
