import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Trash2, LogOut,  Eye, EyeOff, CreditCard, Bell, Globe, Moon, Sun, User, Lock, FileText, AlertTriangle, MoreVertical, Upload, Check } from "lucide-react";

function showToast(message: string) {
  alert(message); // Replace with a real toast in your app
}

export default function Settings() {
  const [tab, setTab] = useState("profile");
  const [mobileTab, setMobileTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "User Name",
    email: "user@example.com",
    bio: "",
    skills: "",
    availability: "Full-time",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    resume: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [plan, setPlan] = useState("Free");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  // Placeholder for connected accounts
  const connectedAccounts = ["Google", "GitHub"];

  // Mobile content renderer
  const renderMobileContent = () => {
    switch (mobileTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile.photo} alt="Profile" />
                <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="photo-upload" className="block mb-1 text-left text-gray-900 dark:text-gray-100">Profile Photo</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const files = e.target?.files;
                      if (files && files[0]) {
                        setProfile(p => ({ ...p, photo: URL.createObjectURL(files[0]) }));
                        showToast("Profile photo updated!");
                      }
                    }}
                  />
                                        <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                        className="flex items-center gap-1 text-xs px-1 py-0.5 h-6 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                      >
                        <Upload className="w-3 h-3" />
                        Upload Photo
                      </Button>
                  {profile.photo && profile.photo !== "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" && (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <Check className="w-4 h-4" />
                      <span className="text-xs">Uploaded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-left text-gray-900 dark:text-gray-100">Name</Label>
                <Input id="name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Name" />
              </div>
              <div>
                <Label htmlFor="email" className="text-left text-gray-900 dark:text-gray-100">Email</Label>
                <Input id="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Email" />
              </div>
            </div>
            <div>
              <Label htmlFor="bio" className="text-left text-gray-900 dark:text-gray-100">Bio</Label>
              <Input id="bio" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Tell us about yourself..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skills" className="text-left text-gray-900 dark:text-gray-100">Skills</Label>
                <Input id="skills" value={profile.skills} onChange={e => setProfile(p => ({ ...p, skills: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="e.g. React, Node.js" />
              </div>
              <div>
                <Label htmlFor="availability" className="text-left text-gray-900 dark:text-gray-100">Availability</Label>
                <Input id="availability" value={profile.availability} onChange={e => setProfile(p => ({ ...p, availability: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Full-time, Part-time..." />
              </div>
            </div>
            <div>
              <Label htmlFor="resume" className="text-left text-gray-900 dark:text-gray-100">Resume/Portfolio</Label>
              <div className="flex items-center gap-2">
                <input
                  id="resume"
                  type="file"
                  accept="application/pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setProfile(p => ({ ...p, resume: e.target.files![0].name }));
                      showToast("Resume/portfolio uploaded!");
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('resume')?.click()}
                  className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </Button>
                {profile.resume && (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-xs">{profile.resume}</span>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={() => showToast("Profile updated!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Save Changes</Button>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-left text-gray-900 dark:text-gray-100">Change Password</Label>
              <div className="flex gap-2 mt-1">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="New password" className="flex-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" />
                <Button type="button" variant="outline" onClick={() => setShowPassword(v => !v)} className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <Button onClick={() => showToast("Password changed!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Update Password</Button>
            </div>
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Two-Factor Authentication (2FA)</Label>
              <div className="flex items-center gap-2 mt-1">
                <Switch id="2fa" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Enable 2FA for extra security</span>
              </div>
            </div>
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Connected Accounts</Label>
              <div className="flex gap-2 mt-1">
                {connectedAccounts.map(acc => (
                  <Button key={acc} variant="outline" size="sm" className="flex items-center gap-1 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
                    <User className="w-3 h-3" />{acc}
                  </Button>
                ))}
                <Button variant="ghost" size="sm" className="dark:text-gray-100 dark:hover:bg-gray-700">+ Add</Button>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Email Alerts</span>
              <Switch checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Push Notifications</span>
              <Switch checked={notifications.push} onCheckedChange={v => setNotifications(n => ({ ...n, push: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">SMS Updates</span>
              <Switch checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
            </div>
            <Button onClick={() => showToast("Notification preferences saved!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Save Preferences</Button>
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Current Plan</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs ${plan === "Premium" ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>{plan}</span>
                <Button size="sm" variant="outline" onClick={() => { setPlan(plan === "Free" ? "Premium" : "Free"); showToast("Plan updated!"); }} className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
                  {plan === "Free" ? "Upgrade" : "Downgrade"}
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Payment Method</Label>
              <Input placeholder="Card ending in 1234" className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" />
              <Button onClick={() => showToast("Payment method updated!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Update Payment</Button>
            </div>
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Billing History</Label>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-xs mt-1 dark:text-gray-300">No invoices yet.</div>
            </div>
            <Button variant="destructive" onClick={() => showToast("Subscription cancelled!")}>Cancel Subscription</Button>
          </div>
        );
      case "preferences":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Language</Label>
              <Input value={language} onChange={e => setLanguage(e.target.value)} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Language" />
            </div>
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Timezone</Label>
              <Input value={timezone} onChange={e => setTimezone(e.target.value)} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Timezone" />
            </div>
            <div>
              <Label className="text-left text-gray-900 dark:text-gray-100">Currency</Label>
              <Input value={currency} onChange={e => setCurrency(e.target.value)} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Currency" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-900 dark:text-gray-100">Theme</span>
              <Button variant={theme === "light" ? "default" : "outline"} size="sm" onClick={() => setTheme("light")} className="dark:bg-blue-600 dark:hover:bg-blue-700"> <Sun className="w-4 h-4" /> Light</Button>
              <Button variant={theme === "dark" ? "default" : "outline"} size="sm" onClick={() => setTheme("dark")} className="dark:bg-blue-600 dark:hover:bg-blue-700"> <Moon className="w-4 h-4" /> Dark</Button>
            </div>
            <Button onClick={() => showToast("Preferences saved!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Save Preferences</Button>
          </div>
        );
      case "danger":
        return (
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
              <h3 className="text-red-700 dark:text-red-400 font-semibold mb-2">Danger Zone</h3>
              <div className="flex flex-col gap-3">
                <Button variant="destructive" onClick={() => setShowDeactivateModal(true)}><LogOut className="w-4 h-4 mr-1" />Deactivate Account</Button>
                <Button variant="destructive" onClick={() => setShowDeleteModal(true)}><Trash2 className="w-4 h-4 mr-1" />Delete Account</Button>
                <Button variant="outline" onClick={() => showToast("Data exported!")} className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">Export Data</Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-900 px-4 sm:px-6 py-6 lg:py-8 max-w-[1400px] mx-auto transition-colors duration-200">
      <div className="max-w-3xl mx-auto p-6">
        {/* Mobile Header */}
        <div className="sm:hidden flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 dark:text-gray-100 dark:hover:bg-gray-800">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem onClick={() => setMobileTab("profile")} className="flex items-center gap-2 dark:text-gray-100 dark:hover:bg-gray-700">
                <User className="w-4 h-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileTab("security")} className="flex items-center gap-2 dark:text-gray-100 dark:hover:bg-gray-700">
                <Lock className="w-4 h-4" />
                Security
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileTab("notifications")} className="flex items-center gap-2 dark:text-gray-100 dark:hover:bg-gray-700">
                <Bell className="w-4 h-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileTab("billing")} className="flex items-center gap-2 dark:text-gray-100 dark:hover:bg-gray-700">
                <CreditCard className="w-4 h-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileTab("preferences")} className="flex items-center gap-2 dark:text-gray-100 dark:hover:bg-gray-700">
                <Globe className="w-4 h-4" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMobileTab("danger")} className="flex items-center gap-2 text-red-600 dark:text-red-400 dark:hover:bg-gray-700">
                <AlertTriangle className="w-4 h-4" />
                Danger Zone
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Header */}
        <h1 className="hidden sm:block text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Settings</h1>
        
        {/* Desktop Tabs */}
        <div className="hidden sm:block">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 sm:grid-cols-6 gap-2 dark:bg-gray-800">
              <TabsTrigger value="profile" className="dark:text-gray-100 dark:data-[state=active]:bg-gray-700"><User className="w-4 h-4 mr-1" />Profile</TabsTrigger>
              <TabsTrigger value="security" className="dark:text-gray-100 dark:data-[state=active]:bg-gray-700"><Lock className="w-4 h-4 mr-1" />Security</TabsTrigger>
              <TabsTrigger value="notifications" className="dark:text-gray-100 dark:data-[state=active]:bg-gray-700"><Bell className="w-4 h-4 mr-1" />Notifications</TabsTrigger>
              <TabsTrigger value="billing" className="dark:text-gray-100 dark:data-[state=active]:bg-gray-700"><CreditCard className="w-4 h-4 mr-1" />Billing</TabsTrigger>
              <TabsTrigger value="preferences" className="dark:text-gray-100 dark:data-[state=active]:bg-gray-700"><Globe className="w-4 h-4 mr-1" />Preferences</TabsTrigger>
              <TabsTrigger value="danger" className="dark:text-gray-100 dark:data-[state=active]:bg-gray-700"><AlertTriangle className="w-4 h-4 mr-1 text-red-600 dark:text-red-400" />Danger Zone</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={profile.photo} alt="Profile" />
                    <AvatarFallback className="dark:bg-gray-700 dark:text-gray-300">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="photo-upload" className="block mb-1 text-left text-gray-900 dark:text-gray-100">Profile Photo</Label>
                    <div className="flex items-center gap-2">
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const files = e.target?.files;
                          if (files && files[0]) {
                            setProfile(p => ({ ...p, photo: URL.createObjectURL(files[0]) }));
                            showToast("Profile photo updated!");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                        className="flex items-center gap-1 text-xs px-1 py-0.5 h-6 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                      >
                        <Upload className="w-3 h-3" />
                        Upload Photo
                      </Button>
                      {profile.photo && profile.photo !== "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" && (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <Check className="w-4 h-4" />
                          <span className="text-xs">Uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-left text-gray-900 dark:text-gray-100">Name</Label>
                    <Input id="name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Name" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-left text-gray-900 dark:text-gray-100">Email</Label>
                    <Input id="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Email" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio" className="text-left text-gray-900 dark:text-gray-100">Bio</Label>
                  <Input id="bio" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Tell us about yourself..." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="skills" className="text-left text-gray-900 dark:text-gray-100">Skills</Label>
                    <Input id="skills" value={profile.skills} onChange={e => setProfile(p => ({ ...p, skills: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="e.g. React, Node.js" />
                  </div>
                  <div>
                    <Label htmlFor="availability" className="text-left text-gray-900 dark:text-gray-100">Availability</Label>
                    <Input id="availability" value={profile.availability} onChange={e => setProfile(p => ({ ...p, availability: e.target.value }))} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Full-time, Part-time..." />
                  </div>
                </div>
                <div>
                  <Label htmlFor="resume" className="text-left text-gray-900 dark:text-gray-100">Resume/Portfolio</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="resume"
                      type="file"
                      accept="application/pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
                      className="hidden"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setProfile(p => ({ ...p, resume: e.target.files![0].name }));
                          showToast("Resume/portfolio uploaded!");
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('resume')?.click()}
                      className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Resume
                    </Button>
                    {profile.resume && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-xs">{profile.resume}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={() => showToast("Profile updated!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Save Changes</Button>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="password" className="text-left text-gray-900 dark:text-gray-100">Change Password</Label>
                  <div className="flex gap-2 mt-1">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="New password" className="flex-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" />
                    <Button type="button" variant="outline" onClick={() => setShowPassword(v => !v)} className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button onClick={() => showToast("Password changed!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Update Password</Button>
                </div>
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Two-Factor Authentication (2FA)</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Switch id="2fa" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Enable 2FA for extra security</span>
                  </div>
                </div>
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Connected Accounts</Label>
                  <div className="flex gap-2 mt-1">
                    {connectedAccounts.map(acc => (
                      <Button key={acc} variant="outline" size="sm" className="flex items-center gap-1 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
                        <User className="w-3 h-3" />{acc}
                      </Button>
                    ))}
                    <Button variant="ghost" size="sm" className="dark:text-gray-100 dark:hover:bg-gray-700">+ Add</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-gray-100">Email Alerts</span>
                  <Switch checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-gray-100">Push Notifications</span>
                  <Switch checked={notifications.push} onCheckedChange={v => setNotifications(n => ({ ...n, push: v }))} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-gray-100">SMS Updates</span>
                  <Switch checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
                </div>
                <Button onClick={() => showToast("Notification preferences saved!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Save Preferences</Button>
              </div>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <div className="space-y-6">
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Current Plan</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded text-xs ${plan === "Premium" ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>{plan}</span>
                    <Button size="sm" variant="outline" onClick={() => { setPlan(plan === "Free" ? "Premium" : "Free"); showToast("Plan updated!"); }} className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
                      {plan === "Free" ? "Upgrade" : "Downgrade"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Payment Method</Label>
                  <Input placeholder="Card ending in 1234" className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" />
                  <Button onClick={() => showToast("Payment method updated!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Update Payment</Button>
                </div>
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Billing History</Label>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-xs mt-1 dark:text-gray-300">No invoices yet.</div>
                </div>
                <Button variant="destructive" onClick={() => showToast("Subscription cancelled!")}>Cancel Subscription</Button>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <div className="space-y-6">
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Language</Label>
                  <Input value={language} onChange={e => setLanguage(e.target.value)} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Language" />
                </div>
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Timezone</Label>
                  <Input value={timezone} onChange={e => setTimezone(e.target.value)} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Timezone" />
                </div>
                <div>
                  <Label className="text-left text-gray-900 dark:text-gray-100">Currency</Label>
                  <Input value={currency} onChange={e => setCurrency(e.target.value)} className="mt-1 bg-white dark:bg-gray-700 text-left dark:text-gray-100 dark:border-gray-600" placeholder="Currency" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-900 dark:text-gray-100">Theme</span>
                  <Button variant={theme === "light" ? "default" : "outline"} size="sm" onClick={() => setTheme("light")} className="dark:bg-blue-600 dark:hover:bg-blue-700"> <Sun className="w-4 h-4" /> Light</Button>
                  <Button variant={theme === "dark" ? "default" : "outline"} size="sm" onClick={() => setTheme("dark")} className="dark:bg-blue-600 dark:hover:bg-blue-700"> <Moon className="w-4 h-4" /> Dark</Button>
                </div>
                <Button onClick={() => showToast("Preferences saved!")} className="mt-2 dark:bg-blue-600 dark:hover:bg-blue-700">Save Preferences</Button>
              </div>
            </TabsContent>

            {/* Danger Zone Tab */}
            <TabsContent value="danger">
              <div className="space-y-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
                  <h3 className="text-red-700 dark:text-red-400 font-semibold mb-2">Danger Zone</h3>
                  <div className="flex flex-col gap-3">
                    <Button variant="destructive" onClick={() => setShowDeactivateModal(true)}><LogOut className="w-4 h-4 mr-1" />Deactivate Account</Button>
                    <Button variant="destructive" onClick={() => setShowDeleteModal(true)}><Trash2 className="w-4 h-4 mr-1" />Delete Account</Button>
                    <Button variant="outline" onClick={() => showToast("Data exported!")} className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">Export Data</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Content */}
        <div className="sm:hidden">
          {renderMobileContent()}
        </div>

        {/* Deactivate Modal */}
        {showDeactivateModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Deactivate Account</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to deactivate your account? You can reactivate it later.</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowDeactivateModal(false)} className="flex-1 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">Cancel</Button>
                  <Button variant="destructive" onClick={() => { setShowDeactivateModal(false); showToast("Account deactivated!"); }} className="flex-1">Deactivate</Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Delete Account</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">This action is irreversible. Are you sure you want to delete your account?</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">Cancel</Button>
                  <Button variant="destructive" onClick={() => { setShowDeleteModal(false); showToast("Account deleted!"); }} className="flex-1">Delete</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

