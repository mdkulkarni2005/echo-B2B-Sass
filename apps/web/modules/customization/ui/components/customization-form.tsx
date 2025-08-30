import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import { Textarea } from "@workspace/ui/components/textarea";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

// Combined schema for all widget settigns
export const widgetSettingsSchema = z.object({
  greetMessage: z.string().min(1, "Greeting message is required"),
  defaultSuggestions: z.object({
    suggestion1: z.string().optional(),
    suggestion2: z.string().optional(),
    suggestion3: z.string().optional(),
  }),
  vapiSettings: z.object({
    assistantId: z.string().optional(),
    phoneNumber: z.string().optional(),
  }),
});

type WidgetSettings = Doc<"widgetSetting">;
type FromSchema = z.infer<typeof widgetSettingsSchema>;

interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
  hasVapiPlugin: boolean;
}

export const CustomizationForm = ({ initialData }: CustomizationFormProps) => {
  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);

  const form = useForm<useForm>({
    resolver: zodResolver(widgetSettingsSchema),
    defaultValues: {
      greetMessage:
        initialData?.greetMessage || "Hi! How can i help you today?",
      defaultSuggestions: {
        suggestion1: initialData?.defaultSuggestions.suggestion1 || "",
        suggestion2: initialData?.defaultSuggestions.suggestion2 || "",
        suggestion3: initialData?.defaultSuggestions.suggestion3 || "",
      },
      vapiSettings: {
        assistantId: initialData?.vapiSettings.assistantId || "",
        phoneNumber: initialData?.vapiSettings.phoneNumber || "",
      }
    },
  });

  return <div>Form!</div>;
};
