
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddActivityForm } from "@/components/activities/AddActivityForm";
import { ActivityList } from "@/components/activities/ActivityList";

export default function Activities() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Activities</h1>
          <p className="text-muted-foreground">
            Track your daily activities and their carbon impact.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Record New Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <AddActivityForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityList />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
