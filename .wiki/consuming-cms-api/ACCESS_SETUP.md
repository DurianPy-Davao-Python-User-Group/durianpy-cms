# Access & Security Setup

To consume the CMS API from your application (Website or App), you must configure the correct access permissions.

### 💻 Local Development
1.  Run the `durianpy-cms` project locally using the [Local Setup Guide](../local-setup/0-SETUP-INSTRUCTIONS.md).
2.  Set your application's `CMS_URL` environment variable to `http://localhost:3000`.

### 🚀 Production Access
Our production CMS is protected by AWS IAM and API Gateway security.

**Cross-Project Authorization:**
If your application is hosted in a separate AWS account or project, you must ensure its IAM Role is authorized to invoke the CMS API. 

1.  Identify your application's **IAM Role ARN**.
2.  Ensure this ARN is added to the `cms_lambda_custom_policy` in the Terraform IaC (`workspaces/prod/cms/iam.tf`) to allow it to fetch data.
3.  Set your application's `CMS_URL` environment variable to `https://cms.durianpy.org`.
