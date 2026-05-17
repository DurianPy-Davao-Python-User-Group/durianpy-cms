Goal: Setting up durianpy project's (website/app) access to ensure that the app is able to invoke the CMS. For local development, they need to run this project (durianpy-cms) locally and use the localhost URL of this project as the CMS url for their projects.

NOTE: Might need to add additional IAM policy for CMS. Preferrably added to Terraform IaC and providing the durianpy project's resource ARN to be allowed to fetch the data.
