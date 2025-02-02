<template>
  <div class="space-y-8">
    <!-- Profile Header -->
    <div class="relative">
      <!-- Cover Image -->
      <div class="h-48 bg-gradient-to-r from-primary/20 to-primary-hover/20 rounded-lg" />
      
      <!-- Profile Info -->
      <div class="absolute -bottom-16 left-6 flex items-end space-x-6">
        <div class="relative">
          <img 
            :src="profile.avatar || defaultAvatar" 
            :alt="profile.name"
            class="w-32 h-32 rounded-full border-4 border-background bg-card"
          />
          <button 
            @click="$refs.avatarInput.click()"
            class="absolute -bottom-2 -right-2 p-2 rounded-full bg-primary hover:bg-primary-hover text-black transition-colors"
          >
            <PencilIcon class="w-4 h-4" />
          </button>
          <input
            ref="avatarInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleAvatarUpload"
          />
        </div>
        <div class="mb-4">
          <h1 class="text-2xl font-bold">{{ profile.name }}</h1>
          <p class="text-muted-foreground">
            Member since {{ formatDate(profile.joinDate) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="pt-20 pb-4">
      <nav class="flex space-x-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'bg-primary text-black'
              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
          ]"
        >
          <div class="flex items-center space-x-2">
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ tab.label }}</span>
          </div>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="grid gap-6">
      <!-- General Settings -->
      <div v-show="activeTab === 'general'" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="handleUpdateProfile" class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" v-model="profile.name" placeholder="John Doe" />
                </div>
                <div class="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" v-model="profile.email" type="email" placeholder="john@example.com" />
                </div>
                <div class="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select id="timezone" v-model="profile.timezone">
                    <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                      {{ tz.label }}
                    </option>
                  </Select>
                </div>
              </div>
              <Button type="submit" :loading="isUpdating">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <!-- Security Settings -->
      <div v-show="activeTab === 'security'" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-6">
              <!-- 2FA Toggle -->
              <div class="flex items-center justify-between p-4 bg-card border rounded-lg">
                <div class="space-y-0.5">
                  <h3 class="text-base font-medium">Two-Factor Authentication</h3>
                  <p class="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  v-model="security.twoFactorEnabled"
                  @update:modelValue="handleToggle2FA"
                />
              </div>

              <!-- Session Management -->
              <div class="space-y-4">
                <h3 class="text-base font-medium">Active Sessions</h3>
                <div v-for="session in security.loginHistory" :key="session.date" 
                  class="flex items-center justify-between p-4 bg-card border rounded-lg"
                >
                  <div class="flex items-center space-x-4">
                    <div class="p-2 bg-primary/10 rounded-full">
                      <DevicePhoneIcon v-if="session.device.includes('Mobile')" class="w-4 h-4 text-primary" />
                      <MonitorIcon v-else class="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p class="font-medium">{{ session.device }}</p>
                      <p class="text-sm text-muted-foreground">{{ session.location }}</p>
                    </div>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ formatDate(session.date) }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Trading Preferences -->
      <div v-show="activeTab === 'preferences'" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Trading Preferences</CardTitle>
            <CardDescription>Configure your trading settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-6">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <Label>Default Trading Pair</Label>
                  <Select v-model="tradingPreferences.defaultPair">
                    <option value="BTC/USD">BTC/USD</option>
                    <option value="ETH/USD">ETH/USD</option>
                    <option value="XRP/USD">XRP/USD</option>
                  </Select>
                </div>
                <div class="space-y-2">
                  <Label>Risk Level</Label>
                  <Select v-model="tradingPreferences.riskLevel">
                    <option value="low">Conservative</option>
                    <option value="medium">Moderate</option>
                    <option value="high">Aggressive</option>
                  </Select>
                </div>
              </div>

              <div class="space-y-4">
                <h3 class="text-base font-medium">Notifications</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <Label htmlFor="emailNotif">Email Notifications</Label>
                    <Switch
                      id="emailNotif"
                      v-model="tradingPreferences.notifications.email"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <Label htmlFor="pushNotif">Push Notifications</Label>
                    <Switch
                      id="pushNotif"
                      v-model="tradingPreferences.notifications.push"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Button, Input, Select, Label, Switch, Avatar
} from '@/components/ui'
import {
  UserIcon, ShieldIcon, SettingsIcon, ChartIcon,
  PencilIcon, DevicePhoneIcon, MonitorIcon
} from 'lucide-vue-next'
import defaultAvatar from '@/assets/images/default-avatar.svg'
import { useProfileStore } from '@/stores/profile'
import { useUiStore } from '@/stores/ui'
import { formatDate } from '@/utils/format'

// ...rest of existing script code...

const tabs = [
  { id: 'general', label: 'General', icon: UserIcon },
  { id: 'security', label: 'Security', icon: ShieldIcon },
  { id: 'preferences', label: 'Trading', icon: ChartIcon }
]

const timezones = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'New York (EST)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
]
</script>
