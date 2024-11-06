// components/CreateNewUser/DatabaseRolesSection.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DatabaseRolesSectionProps {
  form: any;
}

const DatabaseRolesSection: React.FC<DatabaseRolesSectionProps> = ({ form }) => {
  const databases = form.watch("grantDatabases") || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database and Roles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="defaultRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {form.getValues("roles")?.map((role: string) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="defaultDatabase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Database</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default database" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {form.getValues("databases")?.map((db: string) => (
                    <SelectItem key={db} value={db}>
                      {db}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grantDatabases"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grant Access to Databases</FormLabel>
              <Select
                onValueChange={(value: string) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select databases to grant access" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {form.getValues("databases")?.map((db: string) => (
                    <SelectItem key={db} value={db} disabled={field.value.includes(db)}>
                      {db}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((db: string) => (
                  <Badge
                    key={db}
                    variant="secondary"
                    className="hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
                    onClick={() => field.onChange(field.value.filter((v: string) => v !== db))}
                  >
                    {db}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default DatabaseRolesSection;