import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  Bell,
  Shield,
  Key,
  Trash2
} from 'lucide-react';

export default function DashboardSettings() {
  const { t } = useTranslation();
  const [avatarSrc, setAvatarSrc] = useState<string>("/placeholder-avatar.jpg");
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    company: "Acme Corp",
    bio: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handlePhotoChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: t('dashboard.settings.toasts.invalid_file_type_title'),
        description: t('dashboard.settings.toasts.invalid_file_type_desc'),
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: t('dashboard.settings.toasts.file_too_large_title'),
        description: t('dashboard.settings.toasts.file_too_large_desc'),
        variant: "destructive",
      });
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAvatarSrc(result);
      toast({
        title: t('dashboard.settings.toasts.photo_updated_title'),
        description: t('dashboard.settings.toasts.photo_updated_desc'),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = async () => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: t('dashboard.settings.toasts.missing_fields_title'),
        description: t('dashboard.settings.toasts.missing_fields_desc'),
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t('dashboard.settings.toasts.passwords_no_match_title'),
        description: t('dashboard.settings.toasts.passwords_no_match_desc'),
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: t('dashboard.settings.toasts.password_too_short_title'),
        description: t('dashboard.settings.toasts.password_too_short_desc'),
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Here you would typically make an API call to update the password
      console.log('Updating password...');

      // Clear password fields on success
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      toast({
        title: t('dashboard.settings.toasts.password_updated_title'),
        description: t('dashboard.settings.toasts.password_updated_desc'),
      });
    } catch (error) {
      toast({
        title: t('dashboard.settings.toasts.password_update_error_title'),
        description: t('dashboard.settings.toasts.password_update_error_desc'),
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Here you would typically make an API call to save the data
      console.log('Saving form data:', formData);

      toast({
        title: t('dashboard.settings.toasts.changes_saved_title'),
        description: t('dashboard.settings.toasts.changes_saved_desc'),
      });
    } catch (error) {
      toast({
        title: t('dashboard.settings.toasts.save_error_title'),
        description: t('dashboard.settings.toasts.save_error_desc'),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Here you would typically make an API call to delete the account
      console.log('Deleting account...');

      toast({
        title: t('dashboard.settings.toasts.account_deleted_title'),
        description: t('dashboard.settings.toasts.account_deleted_desc'),
        variant: "destructive",
      });

      // In a real app, you would redirect to home page or login page
      // window.location.href = '/';
    } catch (error) {
      toast({
        title: t('dashboard.settings.toasts.delete_error_title'),
        description: t('dashboard.settings.toasts.delete_error_desc'),
        variant: "destructive",
      });
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('common.settings')}</h1>
          <p className="text-muted-foreground">{t('dashboard.settings.subtitle')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {t('dashboard.settings.profile.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarSrc} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" onClick={handlePhotoChange}>
                    {t('dashboard.settings.profile.change_photo')}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">{t('dashboard.settings.profile.photo_requirements')}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">{t('dashboard.settings.profile.first_name')}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{t('dashboard.settings.profile.last_name')}</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">{t('dashboard.settings.profile.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="company">{t('dashboard.settings.profile.company')}</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bio">{t('dashboard.settings.profile.bio')}</Label>
                <Textarea
                  id="bio"
                  placeholder={t('dashboard.settings.profile.bio_placeholder')}
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                />
              </div>

              <Button
                className="bg-gradient-primary"
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? t('dashboard.settings.profile.saving') : t('dashboard.settings.profile.save_changes')}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                {t('dashboard.settings.notifications.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('dashboard.settings.notifications.email_notifications')}</p>
                    <p className="text-sm text-muted-foreground">{t('dashboard.settings.notifications.email_notifications_desc')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('dashboard.settings.notifications.sync_alerts')}</p>
                    <p className="text-sm text-muted-foreground">{t('dashboard.settings.notifications.sync_alerts_desc')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('dashboard.settings.notifications.weekly_reports')}</p>
                    <p className="text-sm text-muted-foreground">{t('dashboard.settings.notifications.weekly_reports_desc')}</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('dashboard.settings.notifications.marketing')}</p>
                    <p className="text-sm text-muted-foreground">{t('dashboard.settings.notifications.marketing_desc')}</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              {t('dashboard.settings.security.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-3">{t('dashboard.settings.security.password_section')}</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="currentPassword">{t('dashboard.settings.security.current_password')}</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">{t('dashboard.settings.security.new_password')}</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">{t('dashboard.settings.security.confirm_password')}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? t('dashboard.settings.security.updating') : t('dashboard.settings.security.update_password')}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">{t('dashboard.settings.security.two_factor')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{t('dashboard.settings.security.authenticator_app')}</p>
                      <p className="text-sm text-muted-foreground">{t('dashboard.settings.security.not_configured')}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Key className="h-4 w-4 mr-2" />
                      {t('dashboard.settings.security.setup')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <Trash2 className="h-5 w-5 mr-2" />
              {t('dashboard.settings.danger_zone.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">{t('dashboard.settings.danger_zone.delete_account')}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {t('dashboard.settings.danger_zone.delete_warning')}
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">{t('dashboard.settings.danger_zone.delete_account')}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('dashboard.settings.danger_zone.delete_confirm_title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('dashboard.settings.danger_zone.delete_confirm_desc')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeletingAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeletingAccount ? t('dashboard.settings.danger_zone.deleting') : t('dashboard.settings.danger_zone.delete_account')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}