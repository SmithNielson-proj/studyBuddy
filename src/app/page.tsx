"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface QuestionAnswer {
  question: string;
  answer: string;
}

const initialFlashcards: QuestionAnswer[] = [
  {
    question: "What are the four Cloud Service Levels/Pillars? (Amazon calls them computing models)",
    answer: "Infrastructure as a Service (IaaS), Hybrid Infrastructure/Platform as a Service, Platform as a Service (PaaS), and Software as a Service (SaaS)",
  },
  {
    question: "Give examples of IaaS.",
    answer: "Google Compute Engine, Google Cloud Storage, AWS EC2 & S3, Rackspace",
  },
  {
    question: "Give examples of PaaS.",
    answer: "Google App Engine, Cloud Functions, Heroku, Engine Yard, AWS Lambda",
  },
  {
    question: "Give examples of SaaS.",
    answer: "G Suite, Hotmail, Salesforce, Netsuite",
  },
  {
    question: "What is serverless computing?",
    answer: "Serverless computing allows developers to focus on writing code without managing the underlying infrastructure. Servers are abstracted away from the user.",
  },
  {
    question: "What are Google Cloud Console Services called when added to projects?",
    answer: "Resources",
  },
  {
    question: "How are GCP resources organized?",
    answer: "Hierarchically using projects and folders",
  },
  {
    question: "What is the purpose of a GCP Project?",
    answer: "To group resources together. All resources belong to one project.",
  },
  {
    question: "What does the GCP Dashboard provide?",
    answer: "A high-level overview of the selected GCP project, key metrics, and billing information.",
  },
  {
    question: "What is GCP App Engine?",
    answer: "A platform where you upload code and Google manages the infrastructure.",
  },
  {
    question: "What languages are supported by GCP App Engine?",
    answer: "Python, Node.js, Ruby, Java, PHP, Go, C#/.NET",
  },
  {
    question: "In the App Engine Flexible environment, where is the App launched?",
    answer: "Inside a Docker container running within a VM.",
  },
  {
    question: "What does GCP Compute Engine deliver?",
    answer: "Configurable virtual machines",
  },
  {
    question: "What is GCP Cloud SQL?",
    answer: "SQL servers in the cloud.",
  },
  {
    question: "What SQL server types are available in GCP Cloud SQL?",
    answer: "MySQL and Postgres",
  },
  {
    question: "What is the purpose of the Google Identity Platform?",
    answer: "To add authentication to applications.",
  },
  {
    question: "What is a bucket in GCP Cloud Storage?",
    answer: "The basic container that holds data.",
  },
  {
    question: "When should you use Cloud SQL vs. Cloud Spanner?",
    answer: "Use Cloud SQL if you don't need horizontal scalability, and Cloud Spanner if you do.",
  },
  {
    question: "What is GCP BigQuery?",
    answer: "A fast, highly scalable, cost-effective, and fully managed data warehouse.",
  },
  {
    question: "What is Cloud Computing according to Amazon?",
    answer: "The on-demand delivery of compute power, database storage, applications, and other IT resources through a cloud services platform via the Internet with pay-as-you-go pricing.",
  },
  {
    question: "What are the six advantages of AWS Cloud Computing?",
    answer: "Trade capital expense for variable expense, benefit from massive economies of scale, stop guessing capacity, increase speed and agility, stop spending money running and maintaining data centers, and go global in minutes.",
  },
  {
    question: "What are the Cloud Computing Deployment Models?",
    answer: "Cloud, Hybrid, and On-premises",
  },
  {
    question: "What is Amazon Elastic Beanstalk?",
    answer: "A service to create and run applications.",
  },
  {
    question: "What resources are launched when you launch an environment in Elastic Beanstalk?",
    answer: "EC2 instance, Instance security group, Amazon S3 bucket, Amazon CloudWatch alarms, AWS CloudFormation stack, and Domain name",
  },
  {
    question: "What platforms are available on Elastic Beanstalk?",
    answer: "Ruby, PHP, Java, Node.js, Python",
  },
  {
    question: "What is Amazon RDS?",
    answer: "Relational Database Service.",
  },
  {
    question: "What are Relational databases used for?",
    answer: "Traditional applications, ERP, CRM, and e-commerce.",
  },
  {
    question: "What are the Amazon RDS Engine options?",
    answer: "Amazon Aurora, MySQL, MariaDB, PostgreSQL, Oracle, Microsoft SQL Server",
  },
  {
    question: "What is Amazon DynamoDB?",
    answer: "Key-value database service.",
  },
  {
    question: "What are Key-value databases optimized for?",
    answer: "Storing and retrieving key-value pairs in large volumes with low latency.",
  },
  {
    question: "What is Amazon DocumentDB?",
    answer: "Document database service (with MongoDB compatibility).",
  },
  {
    question: "What are Document databases designed for?",
    answer: "Storing semi-structured data as documents.",
  },
  {
    question: "What is Amazon ElastiCache?",
    answer: "In-memory database service for Redis and Memcached.",
  },
  {
    question: "What are In-memory databases used for?",
    answer: "Applications requiring real-time access to data.",
  },
  {
    question: "What is Amazon Neptune?",
    answer: "Graph database service.",
  },
  {
    question: "What are Graph databases used for?",
    answer: "Applications that need to query relationships between highly connected datasets.",
  },
  {
    question: "What is Amazon Timestream?",
    answer: "Time series database.",
  },
  {
    question: "What are Time series databases used for?",
    answer: "Collecting and analyzing data that changes over time (time-series data).",
  },
  {
    question: "What is Amazon Quantum Ledger Database?",
    answer: "Ledger database service.",
  },
  {
    question: "What are Ledger databases used for?",
    answer: "Maintaining a scalable, complete, and verifiable record of transactions.",
  },
  {
    question: "What are some key Azure services?",
    answer: "Azure Virtual Machines, Azure App Service, Azure Spring-Cloud Service / Service Fabric",
  },
  {
    question: "What is Azure App Service?",
    answer: "An HTTP-based service for hosting web applications, REST APIs, and mobile backends.",
  },
  {
    question: "What are some benefits of Azure App Service?",
    answer: "Security, load balancing, autoscaling, automated management, and DevOps capabilities",
  },
  {
    question: "What are some reasons to use App Service?",
    answer: "Multiple languages and frameworks, managed production environment, containerization and Docker support, DevOps optimization, global scale with high availability, connections to SaaS platforms and on-premises data, security and compliance, application templates, Visual Studio integration, API and mobile features, and serverless code",
  },
  {
    question: "What is Azure Resource Manager?",
    answer: "The deployment and management service for Azure.",
  },
  {
    question: "What is an Azure Resource?",
    answer: "A manageable item available through Azure (e.g., VMs, storage accounts).",
  },
  {
    question: "What is an Azure Resource Group?",
    answer: "A container that holds related resources for an Azure solution.",
  },
  {
    question: "What is an Azure Resource Provider?",
    answer: "A service that supplies Azure resources (e.g., Microsoft.Compute, Microsoft.Storage).",
  },
  {
    question: "What is an Azure Resource Manager template?",
    answer: "A JSON file that defines one or more resources to deploy to Azure.",
  },
  {
    question: "What are the benefits of Azure Resource Manager?",
    answer: "Deploy, manage, and monitor resources as a group, redeploy solutions consistently, define dependencies between resources, apply access control, and apply tags for organization.",
  },
  {
    question: "What are the four levels of scope in Azure?",
    answer: "Management groups, subscriptions, resource groups, and resources",
  },
  {
    question: "What are some considerations for Azure Resource Groups?",
    answer: "Resources should share the same lifecycle, each resource is in only one group, resources can be added/removed, resources can be moved between groups, resources can be in different regions, the group has a location for metadata, groups can scope access control, tags can be applied, resources can connect to other groups, deleting a group deletes all resources, and there are limits to resource instances per group.",
  },
  {
    question: "How resilient is Azure Resource Manager?",
    answer: "Resource Manager and control plane operations are distributed across regions and Availability Zones, not dependent on a single data center, and never taken down for maintenance.",
  },
  {
    question: "What are the steps in a basic Microsoft Azure workflow?",
    answer: "Create a resource group, create a MySQL server, configure server firewall, configure a deployment user, create an App Service plan, create a web app, configure app settings, set the git remote and push, and clean up resources.",
  },
  {
    question: "What is an Azure App Service plan?",
    answer: "A set of compute resources for a web app to run on.",
  },
  {
    question: "What does an App Service plan define?",
    answer: "Region, number of VM instances, size of VM instances, and pricing tier.",
  },
  {
    question: "What are the categories of App Service plan pricing tiers?",
    answer: "Shared compute, dedicated compute, and isolated.",
  },
  {
    question: "What is Azure Database for MySQL?",
    answer: "A relational database service powered by the MySQL Community Edition engine.",
  },
  {
    question: "What are the benefits of Azure Database for MySQL?",
    answer: "Built-in high availability, data protection, automated maintenance, predictable performance, elastic scaling, cost optimization, enterprise security, and monitoring/automation.",
  },
  {
    question: "What are the deployment modes for Azure Database for MySQL?",
    answer: "Single Server and Flexible Server (Preview)",
  },
  {
    question: "Describe Azure DB for MySQL - Single Server.",
    answer: "Fully managed, minimal customization, handles patching/backups/HA/security, high availability, engine separated from storage, fast failover, and different pricing tiers.",
  },
  {
    question: "Describe Azure DB for MySQL - Flexible Server.",
    answer: "More control and flexibility, managed maintenance windows, HA across single or multiple availability zones, more cost controls, and read replicas",
  },
];

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [flashcards, setFlashcards] = useState<QuestionAnswer[]>(initialFlashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const addFlashcard = () => {
    if (question && answer) {
      setFlashcards([...flashcards, { question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-4">
      {flashcards.length > 0 && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Flashcard</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="text-center">
              <p className="font-semibold">
                Q: {flashcards[currentCardIndex].question}
              </p>
              {showAnswer && (
                <p>
                  A: {flashcards[currentCardIndex].answer}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={prevCard}>Previous</Button>
              <Button onClick={toggleAnswer}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</Button>
              <Button variant="secondary" onClick={nextCard}>Next</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={toggleAddCard}>
        {showAddCard ? 'Hide Flashcard Form' : 'Add Flashcard'}
      </Button>

      {showAddCard && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Add Flashcard</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="question">Question:</label>
              <Textarea
                id="question"
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="answer">Answer:</label>
              <Textarea
                id="answer"
                placeholder="Enter the answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <Button onClick={addFlashcard}>Add Flashcard</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
