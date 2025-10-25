"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projectSchema, ProjectInput } from "@/lib/schemas";

const steps = [
  "Project Type & Description",
  "Scale & Performance",
  "Integrations & Features",
  "Team Profile & Skillset",
  "Timeline & Budget",
];

export default function NewProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      features: {
        realtime: false,
        auth: false,
        payments: false,
        media: false,
        ai: false,
        analytics: false,
        mobile: false,
        offline: false,
        collaboration: false,
      },
      teamSkills: "",
      integrations: "",
    },
  });

  const onSubmit = (data: ProjectInput) => {
    console.log(data);
    // TODO: Submit to API
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Project Title</label>
              <Input {...register("title")} />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <Textarea {...register("description")} />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Project Type</label>
              <Select onValueChange={(value) => setValue("projectType", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="internal_tool">Internal Tool</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="ai_app">AI App</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Expected Users</label>
              <Input type="number" {...register("users", { valueAsNumber: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium">Team Size</label>
              <Input type="number" {...register("teamSize", { valueAsNumber: true })} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Features</label>
              <div className="space-y-2">
                {["realtime", "auth", "payments", "media", "ai", "analytics", "mobile", "offline", "collaboration"].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={watch(`features.${feature}`)}
                      onCheckedChange={(checked) => setValue(`features.${feature}`, checked)}
                    />
                    <label htmlFor={feature} className="text-sm capitalize">
                      {feature.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Integrations</label>
              <Input placeholder="Comma-separated" {...register("integrations")} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Team Skills</label>
              <Input placeholder="Comma-separated" {...register("teamSkills")} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Timeline (months)</label>
              <Input type="number" {...register("timelineMonths", { valueAsNumber: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium">Budget ($)</label>
              <Input type="number" {...register("budget", { valueAsNumber: true })} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">New Project</h1>
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className={`flex-1 text-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {renderStep()}
        <div className="flex justify-between">
          <Button type="button" onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}